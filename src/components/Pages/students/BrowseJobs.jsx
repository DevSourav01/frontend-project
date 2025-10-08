import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Briefcase, MapPin, DollarSign, Clock, Building2, Search } from "lucide-react";

const BrowseJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    filterJobsList();
  }, [searchTerm, filterType, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          employers (
            company_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const userId = session.user.id;

      // Get student's ID from students table
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("auth_id", userId)
        .single();

      if (studentError) throw studentError;

      // Fetch all job IDs the student has applied to
      const { data: applications, error: appError } = await supabase
        .from("applications")
        .select("job_id")
        .eq("student_id", studentData.id);

      if (appError) throw appError;

      const appliedJobIds = new Set(applications.map((app) => app.job_id));
      setAppliedJobs(appliedJobIds);
    } catch (err) {
      console.error("Error fetching applied jobs:", err.message);
    }
  };

  const filterJobsList = () => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.employers?.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Job type filter
    if (filterType) {
      filtered = filtered.filter((job) => job.job_type === filterType);
    }

    setFilteredJobs(filtered);
  };

  const handleApply = async (jobId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Please login to apply for jobs");
        navigate("/student-login");
        return;
      }

      const userId = session.user.id;

      // Get student's ID from students table
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("id")
        .eq("auth_id", userId)
        .single();

      if (studentError) throw studentError;

      // Check if already applied
      if (appliedJobs.has(jobId)) {
        toast.info("You have already applied to this job");
        return;
      }

      // Insert application
      const { error } = await supabase.from("applications").insert([
        {
          student_id: studentData.id,
          job_id: jobId,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("✅ Application submitted successfully!");
      
      // Update applied jobs set
      setAppliedJobs((prev) => new Set([...prev, jobId]));
    } catch (err) {
      console.error("Error applying to job:", err.message);
      toast.error("Failed to submit application");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Browse Jobs
          </h1>
          <button
            onClick={() => navigate("/student-dashboard")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by job title, location, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            {/* Filter by Job Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Count */}
        <p className="text-gray-600 mb-4">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
        </p>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h2>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    {/* Job Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>

                    {/* Company Name */}
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Building2 size={18} className="text-blue-600" />
                      <span className="font-medium">{job.employers?.company_name || "Company Name"}</span>
                    </div>

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} className="text-blue-600" />
                        {job.location}
                      </span>
                      {job.salary_range && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={16} className="text-blue-600" />
                          {job.salary_range}
                        </span>
                      )}
                      {job.job_type && (
                        <span className="flex items-center gap-1">
                          <Briefcase size={16} className="text-blue-600" />
                          {job.job_type}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={16} className="text-blue-600" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Job Description */}
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {job.description.length > 200
                        ? `${job.description.substring(0, 200)}...`
                        : job.description}
                    </p>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs.has(job.id)}
                  className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition ${
                    appliedJobs.has(job.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {appliedJobs.has(job.id) ? "Already Applied" : "Apply Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;