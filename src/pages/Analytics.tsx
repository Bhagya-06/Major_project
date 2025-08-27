import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ArrowLeft, TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsProps {
  userType: 'farmer' | 'buyer';
}

function Analytics({ userType }: AnalyticsProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock data for farmer analytics
  const farmerEarningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Earnings (₹)',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.1
      }
    ]
  };

  const farmerDemandData = {
    labels: ['Tomatoes', 'Rice', 'Wheat', 'Onions', 'Potatoes'],
    datasets: [
      {
        label: 'Demand Score',
        data: [85, 92, 78, 88, 75],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Mock data for buyer analytics
  const buyerPurchaseData = {
    labels: ['Vegetables', 'Grains', 'Fruits', 'Pulses', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ]
      }
    ]
  };

  const buyerSpendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spending (₹)',
        data: [8000, 12000, 10000, 15000, 13000, 18000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(`/${userType}/dashboard`)}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {userType === 'farmer' ? 'Track your farming performance' : 'Monitor your purchasing patterns'}
            </p>
          </div>
        </div>

        {userType === 'farmer' ? (
          <>
            {/* Farmer Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-600">₹1,23,000</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Listings</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Interested Buyers</p>
                    <p className="text-2xl font-bold text-purple-600">48</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">+23%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Earnings Over Time</h3>
                <Line data={farmerEarningsData} options={chartOptions} />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Crop Demand Trends</h3>
                <Bar data={farmerDemandData} options={chartOptions} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Buyer Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-blue-600">₹76,000</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Purchases</p>
                    <p className="text-2xl font-bold text-green-600">34</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Farmers Connected</p>
                    <p className="text-2xl font-bold text-purple-600">18</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Savings</p>
                    <p className="text-2xl font-bold text-green-600">15%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Purchase Categories</h3>
                <Doughnut data={buyerPurchaseData} options={chartOptions} />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Spending</h3>
                <Bar data={buyerSpendingData} options={chartOptions} />
              </div>
            </div>
          </>
        )}

        {/* Insights Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                {userType === 'farmer' ? 'Peak Season' : 'Best Deals'}
              </h4>
              <p className="text-green-700 text-sm">
                {userType === 'farmer' 
                  ? 'Summer months show 40% higher demand for your crops'
                  : 'You save most on bulk purchases during harvest season'
                }
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                {userType === 'farmer' ? 'Top Performing Crop' : 'Most Purchased'}
              </h4>
              <p className="text-blue-700 text-sm">
                {userType === 'farmer' 
                  ? 'Rice generates the highest profit margins'
                  : 'Vegetables make up 35% of your total purchases'
                }
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                {userType === 'farmer' ? 'Growth Opportunity' : 'Cost Savings'}
              </h4>
              <p className="text-purple-700 text-sm">
                {userType === 'farmer' 
                  ? 'Consider expanding tomato production based on demand'
                  : 'Direct farmer purchases save you 15% on average'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;