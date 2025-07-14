import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import Navbar from '../components/Navbar';
import { Signup } from '../components/Signup';
import { Login } from '../components/Login';

const Hero = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      <LandingPage setShowSignup={() => setShowSignup(true)} />
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
    </div>
  );
};

export default Hero;
