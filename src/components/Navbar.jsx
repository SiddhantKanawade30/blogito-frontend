import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ setShowSignup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">Blogito</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#" className="text-gray-600 hover:text-black transition">Home</a>
          <a href="#features" className="text-gray-600 hover:text-black transition">Features</a>
          <a href="#about" className="text-gray-600 hover:text-black transition">About</a>
          <a href="#contact" className="text-gray-600 hover:text-black transition">Contact</a>
          <button onClick={()=>setShowSignup(true)} className="ml-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-black">Home</a>
          <a href="#features" className="block text-gray-700 hover:text-black">Features</a>
          <a href="#about" className="block text-gray-700 hover:text-black">About</a>
          <a href="#contact" className="block text-gray-700 hover:text-black">Contact</a>
          <button onClick={()=>setShowSignup(true)} className="w-full mt-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
