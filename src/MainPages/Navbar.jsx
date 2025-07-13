import React from "react";

export default function LandingPage() {
  return (
    <div className=" bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Blogito</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
                  About
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium">
                  Explore
                </a>
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="flex items-center">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 text-sm font-medium mr-4">
                Sign In
              </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors" >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      
    </div>
  );
}