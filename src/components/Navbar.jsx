// components/Navbar.jsx
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-screen w-64 bg-white dark:bg-gray-900 text-black dark:text-white p-4 space-y-6">
      <Link to="/" className="block text-xl font-bold">Feed</Link>
      <Link to="/search">Search</Link>
      {user && <>
        <Link to="/create">Create</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={logout}>Logout</button>
      </>}
      <ThemeToggle />
    </nav>
  );
}
