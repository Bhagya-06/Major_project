import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Mic, 
  MicOff, 
  Camera, 
  Upload, 
  ArrowLeft, 
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

function CropListing() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    pricePerKg: '',
    location: '',
    description: ''
  });

  // Initialize speech recognition
  React.useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          parseVoiceInput(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  const parseVoiceInput = (text: string) => {
    // Simple parsing logic for demo - in production, use NLP
    const words = text.toLowerCase().split(' ');
    
    // Try to extract crop name (first few words)
    const cropName = words.slice(0, 3).join(' ');
    
    // Try to extract quantity
    const quantityMatch = text.match(/(\d+)\s*(kg|kilogram|kilo)/i);
    const quantity = quantityMatch ? quantityMatch[1] : '';
    
    // Try to extract price
    const priceMatch = text.match(/(\d+)\s*(rupee|rs|₹|price)/i);
    const price = priceMatch ? priceMatch[1] : '';

    setFormData(prev => ({
      ...prev,
      cropName: cropName || prev.cropName,
      quantity: quantity || prev.quantity,
      pricePerKg: price || prev.pricePerKg,
      description: text
    }));

    // Get AI suggestions
    getAISuggestions(cropName, quantity, price);
  };

  const getAISuggestions = async (cropName: string, quantity: string, price: string) => {
    try {
      const response = await axios.post('/ai/price-suggestion', {
        cropName,
        quantity: parseInt(quantity) || 0,
        currentPrice: parseInt(price) || 0,
        location: formData.location
      });
      setAiSuggestions(response.data);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (image) {
        submitData.append('image', image);
      }

      await axios.post('/crops/create', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/farmer/dashboard');
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Crop Listed Successfully!</h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Crop</h1>
            <p className="text-gray-600 mt-1">Use voice input or fill the form manually</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Voice Input</h2>
              
              <div className="text-center">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white shadow-lg hover:shadow-xl`}
                >
                  {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
                </button>
                
                <p className="mt-4 text-sm text-gray-600">
                  {isRecording ? 'Recording... Tap to stop' : 'Tap to start voice input'}
                </p>
                
                {transcript && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left">
                    <p className="text-sm text-gray-700">
                      <strong>Transcript:</strong> {transcript}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Suggestions */}
            {aiSuggestions && (
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Recommended Price Range</p>
                    <p className="text-lg font-bold text-blue-700">₹{aiSuggestions.minPrice} - ₹{aiSuggestions.maxPrice}/kg</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Demand Forecast</p>
                    <p className="text-sm text-green-700">{aiSuggestions.demandForecast}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Crop Details</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Crop Name *
                    </label>
                    <input
                      type="text"
                      name="cropName"
                      value={formData.cropName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Tomatoes, Rice, Wheat"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (kg) *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter quantity in kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per kg (₹) *
                    </label>
                    <input
                      type="number"
                      name="pricePerKg"
                      value={formData.pricePerKg}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter price per kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your city/village"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your crop quality, harvest date, etc."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Camera className="h-5 w-5 text-gray-500" />
                      <span>Upload Image</span>
                    </button>
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Crop preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Creating Listing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Create Listing</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropListing;