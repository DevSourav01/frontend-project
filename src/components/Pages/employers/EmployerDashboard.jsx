import React, { useEffect, useState } from "react";
import { PlusCircle, ClipboardList, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../../../supabaseClient";

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [employerName, setEmployerName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        // ✅ Get current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          toast.error("Session expired. Please login again.", {
            position: "top-right",
            autoClose: 2000,
          });
          navigate("/employer-login");
          return;
        }

        const userId = session.user.id;

        // ✅ Fetch employer info
        const { data, error } = await supabase
          .from("employers")
          .select("company_name")
          .eq("auth_id", userId)
          .single();

        if (error) throw error;

        setEmployerName(data.company_name);
      } catch (err) {
        console.error("Error fetching employer:", err.message);
        toast.error("Failed to fetch employer info", {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("✅ Logout successful! See you soon!", {
      position: "top-right",
      autoClose: 1500,
    });
    setTimeout(() => {
      navigate("/employer-login");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
          Welcome Back, {employerName || "Employer"}
        </h1>

        {/* Logout Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Post a New Job */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
        onClick={() => navigate("/post-job")}>
          <div className="flex items-center gap-3 mb-3">
            <PlusCircle className="text-green-500" />
            <h2 className="text-lg sm:text-xl font-semibold">Post a Job</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Add new job listings and attract top candidates.
          </p>
        </div>

        {/* Manage Jobs */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
        onClick={() => navigate("/manage-jobs")}>
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="text-green-500" />
            <h2 className="text-lg sm:text-xl font-semibold">Manage Jobs</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Edit or remove jobs you’ve already posted.
          </p>
        </div>

        {/* View Applicants */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-green-500" />
            <h2 className="text-lg sm:text-xl font-semibold">View Applicants</h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            See who applied and review their resumes.
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EmployerDashboard;
