import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft, 
  HelpCircle, 
  Video, 
  FileText, 
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Mic,
  Camera,
  TrendingUp,
  Users
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

function Help() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I create my first crop listing?',
      answer: 'Click on "Add New Crop" from your dashboard, then either use voice input by clicking the microphone button or fill out the form manually. You can add crop details, upload photos, and set your price.'
    },
    {
      category: 'Voice Features',
      question: 'How does voice-to-text work for crop listing?',
      answer: 'Simply click the microphone button and speak naturally. Say something like "I have 100 kg of tomatoes for 50 rupees per kg in Mumbai". Our AI will automatically parse your speech and fill in the form fields.'
    },
    {
      category: 'Pricing',
      question: 'How does the AI pricing suggestion work?',
      answer: 'Our AI analyzes market trends, seasonal demand, location factors, and historical data to suggest fair price ranges for your crops. This helps you price competitively while maximizing profits.'
    },
    {
      category: 'Buyers',
      question: 'How do buyers find my crops?',
      answer: 'Buyers can search and filter crops by location, type, and price. When they express interest in your listing, you\'ll receive a notification and can connect with them directly.'
    },
    {
      category: 'Analytics',
      question: 'What insights can I get from the analytics dashboard?',
      answer: 'The analytics dashboard shows your earnings over time, demand trends for different crops, interested buyers, and growth patterns. This helps you make informed decisions about what to grow and when.'
    },
    {
      category: 'Mobile',
      question: 'Is FarmConnect available on mobile?',
      answer: 'Yes! FarmConnect is fully responsive and works perfectly on mobile browsers. We also provide an Android APK for offline capability.'
    },
    {
      category: 'Support',
      question: 'What if I need help or have technical issues?',
      answer: 'You can contact our support team through the help center, check our FAQ section, or watch tutorial videos. We\'re here to help you succeed!'
    },
    {
      category: 'Logistics',
      question: 'How does delivery and logistics work?',
      answer: 'Currently, FarmConnect connects you with buyers and shows available delivery agents in your area. You can coordinate directly with buyers for pickup or delivery arrangements.'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with FarmConnect',
      description: 'Learn the basics of using FarmConnect for your farming business',
      duration: '5:30',
      thumbnail: 'https://images.pexels.com/photos/4750328/pexels-photo-4750328.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      title: 'Voice-Powered Crop Listing',
      description: 'Master the voice input feature for quick crop listings',
      duration: '3:45',
      thumbnail: 'https://images.pexels.com/photos/5799505/pexels-photo-5799505.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      title: 'Understanding AI Price Suggestions',
      description: 'Learn how to use AI-powered pricing for maximum profits',
      duration: '7:20',
      thumbnail: 'https://images.pexels.com/photos/5911834/pexels-photo-5911834.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      title: 'Analytics Dashboard Deep Dive',
      description: 'Explore insights and analytics to grow your business',
      duration: '6:15',
      thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const userType = user?.userType || 'farmer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(`/${userType}/dashboard`)}
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 mt-1">Get support and learn how to use FarmConnect</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
              <Video className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutorial Videos</h3>
            <p className="text-gray-600 text-sm">Watch step-by-step guides</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm">Read detailed guides</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get help from our team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Videos */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Video className="h-6 w-6 text-blue-600" />
                <span>Tutorial Videos</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="flex space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{tutorial.description}</p>
                      <span className="text-xs text-blue-600 font-medium">{tutorial.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <HelpCircle className="h-6 w-6 text-green-600" />
                <span>Frequently Asked Questions</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                          {faq.category}
                        </span>
                        <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                      </div>
                      {openFAQ === index ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-3">
                <Mic className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Voice Listing</h4>
              <p className="text-sm text-gray-600">Add crops by speaking naturally</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-3">
                <Camera className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Image Upload</h4>
              <p className="text-sm text-gray-600">Showcase your crops with photos</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Pricing</h4>
              <p className="text-sm text-gray-600">Get smart price suggestions</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-3">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Direct Connect</h4>
              <p className="text-sm text-gray-600">Connect with buyers instantly</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Still Need Help?</h3>
            <p className="text-green-100 mb-6">Our support team is here to help you succeed</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;