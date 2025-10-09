import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { Briefcase, User, Mail, FileText, Calendar, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No logged-in employer found.");

      const { data, error } = await supabase
        .from("applications")
        .select(
          `
          id,
          status,
          created_at,
          students ( fullname, email, resumelink ),
          jobs ( title )
        `
        )
        .eq("jobs.employer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error("❌ Error fetching applications:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    setProcessingId(applicationId);
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;
      alert(`Application marked as ${newStatus}`);
      fetchApplications();
    } catch (err) {
      console.error("❌ Error updating status:", err.message);
      alert("Failed to update application status");
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Applications</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Job Applications
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Manage and review candidate applications
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-600">
                Pending: {applications.filter(a => a.status === 'pending').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-600">
                Accepted: {applications.filter(a => a.status === 'accepted').length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-600">
                Rejected: {applications.filter(a => a.status === 'rejected').length}
              </span>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Applications Yet</h3>
            <p className="text-gray-600">
              Applications from candidates will appear here once they start applying to your jobs.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-blue-500"
              >
                <div className="p-6">
                  {/* Job Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {app.jobs?.title || "Untitled Job"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Applied on {new Date(app.created_at).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {app.status === "accepted" && (
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-semibold text-sm">Accepted</span>
                        </div>
                      )}
                      {app.status === "rejected" && (
                        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
                          <XCircle className="w-4 h-4" />
                          <span className="font-semibold text-sm">Rejected</span>
                        </div>
                      )}
                      {app.status === "pending" && (
                        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold text-sm">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Candidate Name</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {app.students?.fullname || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email Address</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {app.students?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Link */}
                  {app.students?.resumelink && (
                    <div className="mb-4">
                      <a
                        href={app.students.resumelink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {app.status === "pending" && (
                    <div className="flex gap-3 pt-4 border-t">
                      <button
                        onClick={() => updateStatus(app.id, "accepted")}
                        disabled={processingId === app.id}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === app.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        Accept Candidate
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, "rejected")}
                        disabled={processingId === app.id}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {processingId === app.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )}
                        Reject Candidate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;