import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabaseClient"; // ✅ Import Supabase client
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Validation Schema
const employerSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  companyEmail: yup.string().email("Enter a valid email").required("Email is required"),
  companySize: yup.string().required("Please select your company size"),
  location: yup.string().required("Location is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const EmployerSignup = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Sign up the employer in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.companyEmail,
        password: data.password,
      });

      if (authError) throw authError;

      // 2️⃣ Save extra details in Supabase "employers" table
      const { error: dbError } = await supabase.from("employers").insert([
        {
          company_name: data.companyName,
          company_email: data.companyEmail,
          company_size: data.companySize,
          location: data.location,
          auth_id: authData?.user?.id,
        },
      ]);

      if (dbError) throw dbError;

       toast.success("🎉 Employer signup successful!", {
              position: "top-right",
              autoClose: 3000,
            });
      
            setTimeout(() => navigate("/student-dashboard"), 1500);
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
          Employer Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              {...register("companyName")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              placeholder="Enter your company name"
            />
            <p className="text-red-500 text-sm mt-1">{errors.companyName?.message}</p>
          </div>

          {/* Company Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Company Email</label>
            <input
              type="email"
              {...register("companyEmail")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              placeholder="Enter company email"
            />
            <p className="text-red-500 text-sm mt-1">{errors.companyEmail?.message}</p>
          </div>

          {/* Company Size */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Company Size</label>
            <select
              {...register("companySize")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="200+">200+ employees</option>
            </select>
            <p className="text-red-500 text-sm mt-1">{errors.companySize?.message}</p>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              {...register("location")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              placeholder="City, Country"
            />
            <p className="text-red-500 text-sm mt-1">{errors.location?.message}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
              placeholder="Create a password"
            />
            <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-6"
          >
            Create Employer Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerSignup;
