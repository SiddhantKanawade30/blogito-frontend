import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/update', { email, password });
      alert('Check your inbox to verify updated email/password.');
      logout();
    } catch (err) {
      alert(err.response?.data || 'Failed to update account');
    }
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">My Account</h2>

      <input
        type="email"
        placeholder="Update Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white"
      />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white"
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Update Account
      </button>
    </form>
  );
}