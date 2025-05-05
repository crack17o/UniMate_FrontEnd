import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Alerts from './components/alerts/Alerts';
import Communications from './components/communications/Communications';
import Library from './components/library/Library';
import Chatbot from './components/chatbot/Chatbot';
import Loader from './components/layout/Loader';
import Profile from './pages/Profile';
import OTP from './components/auth/OTP';
import TwoFactorOTP from './components/auth/TwoFactorOTP';
import ResetPasswordOTP from './components/auth/ResetPasswordOTP';
import ResetPassword from './components/auth/ResetPassword';
import ResetPass from './components/auth/ResetPass';

// Import des styles
import './styles/global.css';
import './styles/layout.css';
import './styles/planning.css';
import './styles/alerts.css';
import './styles/communications.css';
import './styles/library.css';
import './styles/chatbot.css';
import './styles/loader.css';
import './styles/components.css';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Loader />}
      {['/login', '/', '/otp/2fa', '/otp/reset-password', '/reset-password'].includes(location.pathname) ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp/2fa" element={<TwoFactorOTP />} />
          <Route path="/otp/reset-password" element={<ResetPasswordOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      ) : (
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              } />
              <Route path="/planning" element={
                <>
                  <Navbar />
                  <Planning />
                </>
              } />
              <Route path="/alerts" element={
                <>
                  <Navbar />
                  <Alerts />
                </>
              } />
              <Route path="/communications" element={
                <>
                  <Navbar />
                  <Communications />
                </>
              } />
              <Route path="/library" element={
                <>
                  <Navbar />
                  <Library />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <Navbar />
                  <Profile />
                </>
              } />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/otp/password" element={
                <>
                  <Navbar />
                  <OTP />
                </>
              } />
              <Route path="/otp/email" element={
                <>
                  <Navbar />
                  <OTP />
                </>
              } />
              <Route path="/resetpass" element={
                <>
                  <Navbar/>
                  <ResetPass />
                </>    
              } />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default AppContent;