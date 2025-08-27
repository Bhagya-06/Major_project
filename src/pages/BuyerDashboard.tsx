import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  Search, 
  BarChart3, 
  Bell, 
  HelpCircle, 
  LogOut,
  ShoppingCart,
  TrendingUp,
  Eye,
  Heart,
  MapPin
} from 'lucide-react';

interface CropListing {
  _id: string;
  cropName: string;
  quantity: number;
  pricePerKg: number;
  location: string;
  description: string;
  farmerName: string;
  image?: string;
  createdAt: string;
  interestedBuyers: number;
}

function BuyerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [crops, setCrops] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(2);

  useEffect(() => {
    fetchAvailableCrops();
  }, []);

  const fetchAvailableCrops = async () => {
    try {
      const response = await axios.get('/crops/available');
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async (cropId: string) => {
    try {
      await axios.post(`/crops/${cropId}/interest`);
      // Update the UI to reflect the interest
      setCrops(prev => prev.map(crop => 
        crop._id === cropId 
          ? { ...crop, interestedBuyers: crop.interestedBuyers + 1 }
          : crop
      ));
    } catch (error) {
      console.error('Error expressing interest:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">FarmConnect</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-lg font-medium text-gray-600">Buyer Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/help')}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <HelpCircle className="h-6 w-6" />
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.location}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover fresh crops from local farmers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Crops</p>
                <p className="text-3xl font-bold text-gray-900">{crops.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Viewed Today</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interested In</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => navigate('/buyer/browse')}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <Search className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Browse All Crops</h3>
                <p className="text-blue-100">Explore available produce</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/buyer/analytics')}
            className="group bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">View Analytics</h3>
                <p className="text-green-100">Track your purchases</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Crops */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recently Listed Crops</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading available crops...</p>
              </div>
            ) : crops.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No crops available</h3>
                <p className="text-gray-600">Check back later for new listings</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.slice(0, 6).map((crop) => (
                  <div key={crop._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{crop.cropName}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Fresh
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-medium">Farmer:</span> {crop.farmerName}</p>
                      <p><span className="font-medium">Quantity:</span> {crop.quantity} kg</p>
                      <p><span className="font-medium">Price:</span> ₹{crop.pricePerKg}/kg</p>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{crop.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {crop.interestedBuyers} interested
                      </div>
                      <button
                        onClick={() => handleInterest(crop._id)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        I'm Interested
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;