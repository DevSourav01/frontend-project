import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  resumeLink: yup
    .string()
    .url("Enter a valid URL")
    .required("Resume link is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const StudentSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentSchema),
  });

  const onSubmit = (data) => {
    console.log("Student data submitted:", data);
    alert("Student signup successful ✅");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
          Student Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Enter your full name"
            />
            <p className="text-red-500 text-sm mt-1">{errors.fullName?.message}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Enter your email"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Enter phone number"
            />
            <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Skills</label>
            <input
              type="text"
              {...register("skills")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="e.g., React, Node.js, UI Design"
            />
            <p className="text-red-500 text-sm mt-1">{errors.skills?.message}</p>
          </div>

          {/* Education */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Education</label>
            <input
              type="text"
              {...register("education")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="e.g., B.Tech in Computer Science"
            />
            <p className="text-red-500 text-sm mt-1">{errors.education?.message}</p>
          </div>

          {/* Resume Link */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Resume Link</label>
            <input
              type="text"
              {...register("resumeLink")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Paste your resume or portfolio link"
            />
            <p className="text-red-500 text-sm mt-1">{errors.resumeLink?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              placeholder="Create a password"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-6"
          >
            Create Student Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;