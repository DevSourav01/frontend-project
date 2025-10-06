import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "student") {
      navigate("/student-login");
    } else if (role === "employer") {
      navigate("/employer-login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Select Your Role</h1>
      <p className="text-gray-600 mb-10 text-lg">Choose how you want to continue</p>
      
      <div className="flex gap-8">
        <button
          onClick={() => handleSelect("student")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-semibold text-lg"
        >
          🎓 Job Seeker
        </button>
        <button
          onClick={() => handleSelect("employer")}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-3 rounded-2xl hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-semibold text-lg"
        >
          💼 Employer
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;