import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Award, GraduationCap, FileText, Save } from "lucide-react";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    resumelink: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/student-login");
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching student profile:", error.message);
      } else if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("students")
      .update({
        fullname: profile.fullname,
        phone: profile.phone,
        skills: profile.skills,
        education: profile.education,
        resumelink: profile.resumelink,
      })
      .eq("auth_id", user.id);

    setLoading(false);

    if (error) {
      alert("Failed to update profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-full">
              <User className="w-12 h-12" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center">My Profile</h2>
          <p className="text-center text-blue-100 mt-2">Manage your personal information</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSave} className="p-8 space-y-6">
          {/* Full Name */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={profile.fullname}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={profile.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <div className="relative">
              <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <textarea
                name="skills"
                placeholder="Enter your skills (comma separated)"
                value={profile.skills}
                onChange={handleChange}
                rows="3"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Education */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <textarea
                name="education"
                placeholder="Enter your education details"
                value={profile.education}
                onChange={handleChange}
                rows="3"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Resume Link */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Resume Link</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="resumelink"
                placeholder="Google Drive or PDF URL"
                value={profile.resumelink}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl py-4 font-semibold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;