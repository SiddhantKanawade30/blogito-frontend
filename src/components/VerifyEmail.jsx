
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        await axios.get(`${backendUrl}/api/auth/verify-email?token=${token}`);
        alert("Email verified successfully! Please go to login page and login");
        
      } catch (error) {
       
        console.error(error);
      }
    };

    if (token) {
      verifyEmail();
       navigate("/")
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Verifying your email...</h2>
        <p className="text-gray-600">Please wait, we're verifying your account.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
