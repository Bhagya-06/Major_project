import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  User,
  Calendar,
  Heart
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

function BrowseCrops() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<CropListing[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<CropListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    fetchCrops();
  }, []);

  useEffect(() => {
    filterCrops();
  }, [searchTerm, locationFilter, priceFilter, crops]);

  const fetchCrops = async () => {
    try {
      const response = await axios.get('/crops/available');
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCrops = () => {
    let filtered = [...crops];

    if (searchTerm) {
      filtered = filtered.filter(crop =>
        crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(crop =>
        crop.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (priceFilter) {
      switch (priceFilter) {
        case 'low':
          filtered = filtered.filter(crop => crop.pricePerKg < 50);
          break;
        case 'medium':
          filtered = filtered.filter(crop => crop.pricePerKg >= 50 && crop.pricePerKg < 100);
          break;
        case 'high':
          filtered = filtered.filter(crop => crop.pricePerKg >= 100);
          break;
      }
    }

    setFilteredCrops(filtered);
  };

  const handleInterest = async (cropId: string) => {
    try {
      await axios.post(`/crops/${cropId}/interest`);
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/buyer/dashboard')}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Crops</h1>
            <p className="text-gray-600 mt-1">Find fresh produce from local farmers</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search crops..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Filter by location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Prices</option>
                <option value="low">Under ₹50/kg</option>
                <option value="medium">₹50-₹100/kg</option>
                <option value="high">Above ₹100/kg</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setPriceFilter('');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Crops ({filteredCrops.length})
            </h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading crops...</p>
              </div>
            ) : filteredCrops.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No crops found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCrops.map((crop) => (
                  <div key={crop._id} className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                    {crop.image && (
                      <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                        <img
                          src={crop.image}
                          alt={crop.cropName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{crop.cropName}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          Fresh
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{crop.farmerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{crop.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(crop.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-semibold">{crop.quantity} kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-semibold text-green-600">₹{crop.pricePerKg}/kg</p>
                        </div>
                      </div>

                      {crop.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {crop.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Heart className="h-4 w-4" />
                          <span>{crop.interestedBuyers} interested</span>
                        </div>
                        <button
                          onClick={() => handleInterest(crop._id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                        >
                          <Heart className="h-4 w-4" />
                          <span>I'm Interested</span>
                        </button>
                      </div>
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

export default BrowseCrops;