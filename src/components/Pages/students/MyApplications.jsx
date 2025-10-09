import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Briefcase, Clock, Building2, MapPin } from "lucide-react";

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Please login to view your applications");
        navigate("/student-login");
        return;
      }

      const userId = session.user.id;

      // Get student ID
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("auth_id", userId)
        .single();

      if (studentError) throw studentError;

      // Fetch all applications joined with job + employer details
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          created_at,
          jobs (
            id,
            title,
            location,
            job_type,
            salary_range,
            employers (
              company_name
            )
          )
        `)
        .eq("student_id", studentData.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (err) {
      console.error("Error fetching applications:", err.message);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Applications
          </h1>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* No Applications */}
        {applications.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Applications Yet
            </h2>
            <p className="text-gray-500">
              Start applying to jobs to track them here!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {app.jobs?.title}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Building2 size={18} className="text-purple-600" />
                      <span className="font-medium">
                        {app.jobs?.employers?.company_name || "Company"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                      {app.jobs?.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={16} className="text-purple-600" />
                          {app.jobs.location}
                        </span>
                      )}
                      {app.jobs?.salary_range && (
                        <span className="flex items-center gap-1">
                          💰 {app.jobs.salary_range}
                        </span>
                      )}
                      {app.jobs?.job_type && (
                        <span className="flex items-center gap-1">
                          🧩 {app.jobs.job_type}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={16} className="text-purple-600" />
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                      app.status === "accepted"
                        ? "bg-green-100 text-green-600"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
