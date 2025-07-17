  import React, { useEffect, useState } from "react";
  import axios from "axios";
import { useNavigate } from "react-router-dom";

  const Settings = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authorization");

    const [email, setEmail] = useState(""); 
    const [newEmail, setNewEmail] = useState("");


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    
    
    useEffect(()=>{

    const fetch = async function(){
      try{
        const response = await axios.get(`${backendUrl}/api/users/me`,{
        headers : {
          authorization : token
        }
      })

      setEmail(response.data.email)
      }catch(err){
        console.error("Error fetching user data:", err.response?.data || err.message);
      }
      
    }
      fetch()
    },[backendUrl])

    const updateEmail = async () => {

      if (!newEmail) {
        alert("Please enter a new email.");
        return;
      }

      const email  = newEmail;

      try {
        setLoading(true);
        await axios.put(`${backendUrl}/api/users/update`, {
          email,
        },{
          headers : {
            authorization : `${token}`
          }
        });

        alert("Email updated successfully!  please verify it ");
        setEmail(newEmail);
        setNewEmail("");
        localStorage.removeItem("authorization")
        navigate("/")
      } catch (error) {
        console.error("Email update failed:", error);
        alert("Failed to update email.");
      } finally {
        setLoading(false);
      }
    };

    const updatePassword = async () => {
      if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill in all password fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
      }
      const password = newPassword

      try {
        setLoading(true);
        await axios.put(`${backendUrl}/api/users/update`, {
          password
        },{
          headers : {
            authorization : `${token}`
          }
        });

        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Password update failed:", error);
        alert("Failed to update password.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

        {/* Email Section */}
        <div className="mb-8">
          <label className="block text-gray-600 mb-2">Current Email</label>
          <div className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-700 mb-3">
            {email}
          </div>

          <label className="block text-gray-600 mb-2">New Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />

          <button
            onClick={updateEmail}
            disabled={loading}
            className="mt-4 bg-black text-white w-full py-3 rounded-lg hover:bg-gray-900 transition"
          >
            {loading ? "Updating..." : "Update Email"}
          </button>
        </div>

        <hr className="my-6" />

        {/* Password Section */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          onClick={updatePassword}
          disabled={loading}
          className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-900 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    );
  };

  export default Settings;
