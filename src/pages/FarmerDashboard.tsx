import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  Plus, 
  BarChart3, 
  List, 
  Bell, 
  HelpCircle, 
  LogOut,
  Sprout,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';

interface CropListing {
  _id: string;
  cropName: string;
  quantity: number;
  pricePerKg: number;
  location: string;
  description: string;
  image?: string;
  createdAt: string;
  interestedBuyers: number;
}

function FarmerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [crops, setCrops] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('/crops/my-crops');
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = crops.reduce((sum, crop) => sum + (crop.quantity * crop.pricePerKg), 0);
  const totalQuantity = crops.reduce((sum, crop) => sum + crop.quantity, 0);
  const totalInterest = crops.reduce((sum, crop) => sum + crop.interestedBuyers, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Sprout className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">FarmConnect</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-lg font-medium text-gray-600">Farmer Dashboard</span>
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
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your crops and connect with buyers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900">{crops.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <List className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quantity</p>
                <p className="text-3xl font-bold text-gray-900">{totalQuantity} kg</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Earnings</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interested Buyers</p>
                <p className="text-3xl font-bold text-gray-900">{totalInterest}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/farmer/add-crop')}
            className="group bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <Plus className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Add New Crop</h3>
                <p className="text-green-100">List crops with voice input</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/farmer/analytics')}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">View Analytics</h3>
                <p className="text-blue-100">Track performance</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/help')}
            className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-full group-hover:bg-opacity-30 transition-all">
                <HelpCircle className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold">Get Help</h3>
                <p className="text-purple-100">FAQs & tutorials</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Crop Listings</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading your crops...</p>
              </div>
            ) : crops.length === 0 ? (
              <div className="text-center py-8">
                <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No crops listed yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first crop listing</p>
                <button
                  onClick={() => navigate('/farmer/add-crop')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Your First Crop
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.slice(0, 6).map((crop) => (
                  <div key={crop._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{crop.cropName}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Quantity:</span> {crop.quantity} kg</p>
                      <p><span className="font-medium">Price:</span> ₹{crop.pricePerKg}/kg</p>
                      <p><span className="font-medium">Location:</span> {crop.location}</p>
                      <p><span className="font-medium">Interested Buyers:</span> {crop.interestedBuyers}</p>
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

export default FarmerDashboard;