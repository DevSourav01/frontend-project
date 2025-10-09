import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No logged-in employer found.");

      // Fetch all applications for jobs posted by this employer
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
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {app.jobs?.title || "Untitled Job"}
              </h3>
              <p className="text-sm text-gray-600">
                👤 {app.students?.fullname} ({app.students?.email})
              </p>
              <p className="text-sm">
                📎{" "}
                <a
                  href={app.students?.resumelink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </p>
              <p className="text-sm mt-1">📅 {new Date(app.created_at).toLocaleString()}</p>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    app.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status || "pending"}
                </span>

                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(app.id, "accepted")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "rejected")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
