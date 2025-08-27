import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ShoppingCart, TrendingUp, Users, Mic, BarChart3 } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">FarmConnect</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Connecting Farmers & Buyers
              <span className="text-green-600"> Seamlessly</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of agricultural trading with voice-enabled crop listing, 
              AI-powered pricing, and direct farmer-buyer connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/register?type=farmer')}
                className="group relative px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Sprout className="h-6 w-6" />
                <span className="font-semibold">I'm a Farmer</span>
              </button>
              <button
                onClick={() => navigate('/register?type=buyer')}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="font-semibold">I'm a Buyer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Agriculture
            </h3>
            <p className="text-lg text-gray-600">
              Everything you need to streamline your agricultural business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                <Mic className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Voice Crop Listing</h4>
              <p className="text-gray-600">
                Simply speak to list your crops. Our AI converts speech to text in multiple languages.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Pricing</h4>
              <p className="text-gray-600">
                AI-powered demand prediction and fair price recommendations based on market data.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Direct Matching</h4>
              <p className="text-gray-600">
                Connect directly with buyers in your area. Get instant notifications for interested parties.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h4>
              <p className="text-gray-600">
                Track your earnings, demand trends, and market insights with beautiful charts.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Browsing</h4>
              <p className="text-gray-600">
                Buyers can easily browse crops by location, type, and availability with smart filters.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full mb-4">
                <Sprout className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Mobile Ready</h4>
              <p className="text-gray-600">
                Fully responsive design that works perfectly on phones, tablets, and desktops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Agricultural Business?
          </h3>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers and buyers already using FarmConnect
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg shadow-lg"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold">FarmConnect</span>
              <span className="text-gray-400">© 2024</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;