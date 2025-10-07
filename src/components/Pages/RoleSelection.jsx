import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      name: "Job Seeker",
      emoji: "🎓",
      description: "Find your dream job and apply instantly",
      role: "student",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Employer",
      emoji: "💼",
      description: "Post jobs and hire top talent",
      role: "employer",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-md">
        Select Your Role
      </h1>
      <p className="text-gray-600 mb-10 text-center text-base sm:text-lg md:text-xl">
        Choose how you want to continue
      </p>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        {roles.map((r) => (
          <div
            key={r.role}
            onClick={() =>
              navigate(r.role === "student" ? "/student-login" : "/employer-login")
            }
            className={`cursor-pointer w-full sm:w-64 md:w-72 p-5 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-r ${r.gradient} text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all`}
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 text-center">{r.emoji}</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">{r.name}</h2>
            <p className="text-center text-sm sm:text-base md:text-base opacity-90">
              {r.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
