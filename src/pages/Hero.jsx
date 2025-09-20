import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import Navbar from '../components/Navbar';
import { Signup } from '../components/Signup';
import { Login } from '../components/Login';
import { ForgotPassword } from '../components/ForgotPassword';

const Hero = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div>
      <Navbar setShowSignup={() => setShowSignup(true)} />
      <LandingPage setShowSignup={() => setShowSignup(true)} setShowLogin={()=>setShowLogin(true)} />
      <Signup
        open={showSignup}
        onClose={() => setShowSignup(false)}
        switchToLogin={handleSwitchToLogin}
      />
      <Login
        open={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignup={handleSwitchToSignup}
      />
      
      <ForgotPassword open={showForgot} onClose={() => setShowForgot(false)} />

    </div>
  );
};

export default Hero;
