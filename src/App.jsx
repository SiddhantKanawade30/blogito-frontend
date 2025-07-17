import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import Feed from './components/Feed';
import CreateBlog from './components/Create';
import Settings from './components/Settings';
import UserProfile from './components/UserProfile';
import ManagerLayout from './pages/ManagerLayout'; // layout with SideNavbar
import VerifyEmail from './components/VerifyEmail';
import { Signup } from './components/Signup';
import { Login } from './components/Login';

const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Hero />} />

       <Route path="/verify-email" element={<VerifyEmail />} />
      
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<Feed />} />
        <Route path="feed" element={<Feed />} />
        <Route path="create" element={<CreateBlog />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
