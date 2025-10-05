import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "student") {
      navigate("/jobseeker-profile");
    } else if (role === "employer") {
      navigate("/employer-profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Select Your Role</h1>
      <div className="flex gap-6">
        <button
          onClick={() => handleSelect("student")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Job Seeker
        </button>
        <button
          onClick={() => handleSelect("employer")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Employer
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
