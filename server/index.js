import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farmconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['farmer', 'buyer'], required: true },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Crop Schema
const cropSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },
  cropName: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerKg: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  interestedBuyers: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Crop = mongoose.model('Crop', cropSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, userType, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      location
    });

    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        location: user.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Crop Routes
app.post('/api/crops/create', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { cropName, quantity, pricePerKg, location, description } = req.body;
    const user = await User.findById(req.user.id);

    const crop = new Crop({
      farmerId: req.user.id,
      farmerName: user.name,
      cropName,
      quantity: parseInt(quantity),
      pricePerKg: parseFloat(pricePerKg),
      location,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await crop.save();
    res.status(201).json(crop);
  } catch (error) {
    console.error('Crop creation error:', error);
    res.status(500).json({ message: 'Error creating crop listing' });
  }
});

app.get('/api/crops/my-crops', authenticateToken, async (req, res) => {
  try {
    const crops = await Crop.find({ farmerId: req.user.id }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crops' });
  }
});

app.get('/api/crops/available', authenticateToken, async (req, res) => {
  try {
    const crops = await Crop.find({ farmerId: { $ne: req.user.id } }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available crops' });
  }
});

app.post('/api/crops/:id/interest', authenticateToken, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    crop.interestedBuyers += 1;
    await crop.save();

    res.json({ message: 'Interest recorded', interestedBuyers: crop.interestedBuyers });
  } catch (error) {
    res.status(500).json({ message: 'Error recording interest' });
  }
});

// AI Routes (Mock implementation for MVP)
app.post('/api/ai/price-suggestion', authenticateToken, async (req, res) => {
  try {
    const { cropName, quantity, currentPrice, location } = req.body;

    // Mock AI logic - in production, this would use real ML models
    const basePrice = currentPrice || 50;
    const demandMultiplier = Math.random() * 0.3 + 0.85; // 0.85 to 1.15
    const seasonalMultiplier = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
    
    const suggestedMin = Math.round(basePrice * demandMultiplier * seasonalMultiplier);
    const suggestedMax = Math.round(suggestedMin * 1.2);

    const demandForecast = Math.random() > 0.5 ? 'High demand expected' : 'Moderate demand expected';

    res.json({
      minPrice: suggestedMin,
      maxPrice: suggestedMax,
      demandForecast,
      confidence: '87%',
      factors: ['Seasonal trends', 'Local demand', 'Quality assessment']
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating price suggestion' });
  }
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});