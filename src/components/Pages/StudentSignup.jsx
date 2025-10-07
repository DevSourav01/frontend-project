import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Validation Schema
const studentSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  skills: yup.string().required("Please list your skills"),
  education: yup.string().required("Education is required"),
  resumeLink: yup.string().url("Enter a valid URL").required("Resume link is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const StudentSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(studentSchema),
  });

  // ✅ On Submit → Supabase signup
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Step 1️⃣: Signup user in Auth
      const { data: _authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;

      // Step 2️⃣: Insert additional user details in "students" table
      const { error: insertError } = await supabase
        .from("students")
        .insert([{
          fullname: data.fullName,
          email: data.email,
          phone: data.phone,
          skills: data.skills,
          education: data.education,
          resumelink: data.resumeLink
        }]);

      if (insertError) throw insertError;

      toast.success("🎉 Student signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/student-dashboard"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(`Signup failed: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-6">
      <ToastContainer />
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md border border-blue-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          Student Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {[
            { name: "fullName", label: "Full Name", placeholder: "Enter your full name" },
            { name: "email", label: "Email", placeholder: "Enter your email" },
            { name: "phone", label: "Phone", placeholder: "Enter phone number" },
            { name: "skills", label: "Skills", placeholder: "e.g., React, Node.js, UI Design" },
            { name: "education", label: "Education", placeholder: "e.g., B.Tech in Computer Science" },
            { name: "resumeLink", label: "Resume Link", placeholder: "Paste your resume or portfolio link" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">{field.label}</label>
              <input
                type={field.name === "email" ? "email" : "text"}
                {...register(field.name)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder={field.placeholder}
              />
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[field.name]?.message}</p>
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Create a password"
            />
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "Creating Account..." : "Create Student Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;
