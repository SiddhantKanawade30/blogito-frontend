import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Login = ({ open, onClose, switchToSignup }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await axios.post(`${backendUrl}/api/auth/signin`, {
        email,
        password,
      });

      
      onClose();
      alert("Login successful!");
      navigate('/manager/feed')
     
      const token = res.data.token;
      localStorage.setItem("authorization", `Bearer ${token}`);
      
    } catch (error) {
      console.error("Login error:", error);

       if (error.response && error.response.status === 401) {
      alert("Invalid credentials or email not verified.");
    } else {
      alert("An error occurred. Please try again later.");
    }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl w-[90%] max-w-md p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="bg-black text-white hover:bg-gray-900 transition p-3 rounded-lg font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-5">
          Don't have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={switchToSignup}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
