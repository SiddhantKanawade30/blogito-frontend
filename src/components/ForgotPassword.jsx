import React, { useRef, useState } from "react";
import axios from "axios";

export const ForgotPassword = ({ open, onClose }) => {
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleForgotPassword = async () => {
    
    const email = emailRef.current.value;

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/auth/forgot-password`, {
        email,
      });

      setMessage("Reset link sent! Check your inbox.");
    } catch (error) {
      console.error("Forgot password error:", error);
      if (error.response?.status === 404) {
        setMessage("Email not found.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
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

        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword();
          }}
        >
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white p-3 rounded-lg font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-purple-600">{message}</p>
        )}
      </div>
    </div>
  );
};
