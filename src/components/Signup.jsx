import React, { useRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import axios from "axios";

export const Signup = ({ open, onClose, switchToLogin }) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const signup = async () => {
    const userName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await axios.post(`${backendUrl}/api/auth/signup`, {
        userName,
        email,
        password,
      });
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl w-[90%] max-w-md p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            signup();
            switchToLogin();
          }}
        >
          <input
            ref={fullNameRef}
            type="text"
            placeholder="Full Name"
            className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </button>
          </div>

          <button
  type="submit"
  className="bg-black text-white hover:bg-gray-900 transition p-3 rounded-lg font-semibold"
  onClick={() => {
    alert("Email sent, please verify it.");
    signup()
    onClose();
    switchToLogin();
  }}
>
  Sign Up
</button>

        </form>

        {/* Switch to Login */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={switchToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
