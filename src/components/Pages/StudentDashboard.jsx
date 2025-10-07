import React from "react";
import { Briefcase, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("✅ Logout successful! See you soon!", {
      position: "top-right",
      autoClose: 1500,
    });

    setTimeout(() => {
      navigate("/"); // redirect to homepage or login
    }, 1500); // wait until toast disappears
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
          🎓 Job Seeker Dashboard
        </h1>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Browse Jobs */}
        <div
          className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate("/browse-jobs")}
        >
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold">Browse Jobs</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            See the latest job postings and apply instantly.
          </p>
        </div>

        {/* My Applications */}
        <div
          className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate("/my-applications")}
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold">My Applications</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Track all your applied jobs and their statuses.
          </p>
        </div>

        {/* Profile Summary */}
        <div
          className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => navigate("/profile-summary")}
        >
          <div className="flex items-center gap-3 mb-3">
            <User className="text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold">Profile Summary</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Update your personal info and resume.
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
