// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Feed from '../pages/Feed';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import CreateBlog from '../pages/CreateBlog';
import Search from '../pages/Search';
import VerifyEmail from '../pages/VerifyEmail';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
    </Routes>
  );
}
