import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Trash2, Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary_range: "",
    job_type: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Session expired. Please login again.");
        navigate("/employer-login");
        return;
      }

      const userId = session.user.id;

      // Fetch jobs for this employer
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      salary_range: job.salary_range || "",
      job_type: job.job_type || "",
    });
  };

  const handleUpdate = async (jobId) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update(formData)
        .eq("id", jobId);

      if (error) throw error;

      toast.success("✅ Job updated successfully!");
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      console.error("Error updating job:", err.message);
      toast.error("Failed to update job");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) throw error;

      toast.success("🗑️ Job deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err.message);
      toast.error("Failed to delete job");
    }
  };

  const handleCancel = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      salary_range: "",
      job_type: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <ToastContainer />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Manage Your Jobs
          </h1>
          <button
            onClick={() => navigate("/employer-dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Posted Yet</h2>
            <p className="text-gray-500 mb-4">Start by posting your first job!</p>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition"
            >
              Post a Job
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                {editingJob === job.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                      placeholder="Job Title"
                    />

                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none h-24"
                      placeholder="Job Description"
                    />

                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                      placeholder="Location"
                    />

                    <input
                      type="text"
                      value={formData.salary_range}
                      onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                      placeholder="Salary Range"
                    />

                    <select
                      value={formData.job_type}
                      onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Internship">Internship</option>
                    </select>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(job.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin size={16} className="text-green-600" />
                            {job.location}
                          </span>
                          {job.salary_range && (
                            <span className="flex items-center gap-1">
                              <DollarSign size={16} className="text-green-600" />
                              {job.salary_range}
                            </span>
                          )}
                          {job.job_type && (
                            <span className="flex items-center gap-1">
                              <Briefcase size={16} className="text-green-600" />
                              {job.job_type}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={16} className="text-green-600" />
                            {new Date(job.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                          title="Edit Job"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                          title="Delete Job"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;