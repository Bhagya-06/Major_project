# FarmConnect - Farmer-Buyer Marketplace MVP

A comprehensive full-stack MVP for connecting farmers and buyers with voice-enabled crop listing, AI-powered pricing, and analytics dashboards.

## 🌟 Features

### For Farmers
- **Voice-Enabled Crop Listing**: Speak to list crops using Google Speech API
- **AI-Powered Price Suggestions**: Get smart pricing recommendations
- **Image Upload**: Add photos of your crops
- **Analytics Dashboard**: Track earnings and demand trends
- **Buyer Notifications**: Get notified when buyers show interest

### For Buyers
- **Crop Browsing**: Filter and search available crops
- **Location-Based Filtering**: Find crops near you
- **Direct Farmer Connection**: Express interest and connect with farmers
- **Purchase Analytics**: Track spending and buying patterns

### Core Features
- **Mobile-Responsive Design**: Works perfectly on all devices
- **Authentication System**: Secure login/signup for farmers and buyers
- **Real-time Updates**: Live notifications and updates
- **Help Center**: Comprehensive FAQs and tutorial videos

## 🚀 Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Charts**: Chart.js with React-Chart.js-2
- **Authentication**: JWT tokens
- **File Upload**: Multer for image handling
- **Icons**: Lucide React

## 📱 Mobile Ready

The application is fully responsive and mobile-optimized. For Android APK generation:

1. **Web App Wrapper**: Use tools like Capacitor or Cordova
2. **PWA**: The app supports Progressive Web App features
3. **Android Studio**: Can be wrapped using Android WebView

## 🛠️ Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment Variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start MongoDB**
```bash
# Make sure MongoDB is running locally or set up MongoDB Atlas
```

4. **Run Development Server**
```bash
npm run dev
```

This starts both the React frontend (port 3000) and Express backend (port 3001).

## 🤖 AI Features (MVP Implementation)

### Speech-to-Text
- Uses Web Speech API for voice input
- Parses natural language to extract crop details
- Supports multilingual input

### Smart Pricing
- Mock ML model for demand prediction
- Considers location, seasonality, and market trends
- Provides confidence scores and reasoning

### Future Enhancements
- Integration with SMILE (Statistical Machine Intelligence & Learning Engine)
- Real-time weather data integration
- Advanced NLP for better voice parsing

## 📊 Analytics Dashboard

### Farmers
- Earnings over time
- Crop demand trends
- Interested buyers metrics
- Growth insights

### Buyers
- Purchase categories breakdown
- Monthly spending patterns
- Savings analytics
- Supplier connections

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization

## 📱 Mobile APK Build Process

For Android Studio integration:

1. **Create Android Project**
```bash
# Use Android Studio to create a new project
# Add WebView component
# Configure permissions for camera, microphone, and internet
```

2. **WebView Configuration**
```java
// Enable JavaScript and file access
WebSettings webSettings = webView.getSettings();
webSettings.setJavaScriptEnabled(true);
webSettings.setAllowFileAccess(true);
webSettings.setMediaPlaybackRequiresUserGesture(false);
```

3. **Build APK**
```bash
# Use Android Studio build system
./gradlew assembleDebug
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Crops
- `POST /api/crops/create` - Create crop listing
- `GET /api/crops/my-crops` - Get farmer's crops
- `GET /api/crops/available` - Get available crops for buyers
- `POST /api/crops/:id/interest` - Express interest in crop

### AI Features
- `POST /api/ai/price-suggestion` - Get AI price suggestions

## 🎯 MVP Scope

This is an MVP focused on demonstrating core functionality:

- ✅ Working voice-to-text crop listing
- ✅ AI-powered price suggestions (mock implementation)
- ✅ Farmer-buyer matching system
- ✅ Analytics dashboards with Chart.js
- ✅ Mobile-responsive design
- ✅ Help center with tutorials

### Production Enhancements Needed
- Real Google Cloud Speech API integration
- Production-grade ML models for pricing
- Payment processing integration
- Real-time chat system
- Advanced logistics matching
- SMS/Email notifications
- Image recognition for crop quality

## 🎨 Design Philosophy

- **Farmer-Friendly**: Simple, intuitive interface
- **Mobile-First**: Optimized for touch interactions
- **Accessibility**: High contrast, readable fonts
- **Performance**: Fast loading, optimized assets

## 🚀 Deployment

### Frontend (Vite Build)
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend (Node.js)
```bash
# Deploy to services like Heroku, DigitalOcean, or AWS
# Set environment variables for production
```

### Database
- Use MongoDB Atlas for production
- Set up proper indexes for performance
- Configure backup strategies

## 📞 Support

For questions or support:
- Check the built-in Help Center
- Review FAQ section
- Contact development team

## 🔮 Future Roadmap

1. **Advanced AI Integration**
   - Real ML models for demand prediction
   - Computer vision for crop quality assessment
   - Weather pattern analysis

2. **Enhanced Communication**
   - Real-time chat between farmers and buyers
   - Video calls for crop inspection
   - Automated notifications system

3. **Logistics Integration**
   - Real-time delivery tracking
   - Integration with logistics partners
   - Route optimization

4. **Payment Processing**
   - Secure payment gateway integration
   - Escrow services
   - Digital contracts

5. **Market Insights**
   - Advanced analytics and reporting
   - Market trend predictions
   - Competitive analysis tools

## 📄 License

This project is developed as an MVP demonstration. All rights reserved.

---

Built with ❤️ for the farming community