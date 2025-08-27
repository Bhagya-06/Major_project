import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CropListing from './pages/CropListing';
import BrowseCrops from './pages/BrowseCrops';
import Analytics from './pages/Analytics';
import Help from './pages/Help';

function ProtectedRoute({ children, userType }: { children: React.ReactNode, userType?: string }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && user.userType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user ? 
        (user.userType === 'farmer' ? <Navigate to="/farmer/dashboard" /> : <Navigate to="/buyer/dashboard" />) 
        : <LandingPage />
      } />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/farmer/dashboard" element={
        <ProtectedRoute userType="farmer">
          <FarmerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/farmer/add-crop" element={
        <ProtectedRoute userType="farmer">
          <CropListing />
        </ProtectedRoute>
      } />
      <Route path="/farmer/analytics" element={
        <ProtectedRoute userType="farmer">
          <Analytics userType="farmer" />
        </ProtectedRoute>
      } />
      <Route path="/buyer/dashboard" element={
        <ProtectedRoute userType="buyer">
          <BuyerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/buyer/browse" element={
        <ProtectedRoute userType="buyer">
          <BrowseCrops />
        </ProtectedRoute>
      } />
      <Route path="/buyer/analytics" element={
        <ProtectedRoute userType="buyer">
          <Analytics userType="buyer" />
        </ProtectedRoute>
      } />
      <Route path="/help" element={
        <ProtectedRoute>
          <Help />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;