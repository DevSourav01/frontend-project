import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../../supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  location: yup.string().required("Location is required"),
  salary_range: yup.string().required("Salary range is required"),
  job_type: yup.string().required("Job type is required"),
});

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      // ✅ Get current employer session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Session expired. Please login again.");
        navigate("/employer-login");
        return;
      }

      const employer_id = session.user.id;

      // ✅ Insert job into Supabase
      const { error } = await supabase.from("jobs").insert([
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          salary_range: formData.salary_range,
          job_type: formData.job_type,
          employer_id,
        },
      ]);

      if (error) throw error;

      toast.success("🎉 Job posted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/employer-dashboard"), 1500);
    } catch (error) {
      console.error("Error posting job:", error.message);
      toast.error(`Failed to post job: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-green-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Post a New Job
        </h2>

        <input
          type="text"
          placeholder="Job Title"
          {...register("title")}
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        />
        <p className="text-red-500 text-sm mb-2">{errors.title?.message}</p>

        <textarea
          placeholder="Job Description"
          {...register("description")}
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none h-24"
        />
        <p className="text-red-500 text-sm mb-2">{errors.description?.message}</p>

        <input
          type="text"
          placeholder="Location"
          {...register("location")}
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        />
        <p className="text-red-500 text-sm mb-2">{errors.location?.message}</p>

        <input
          type="text"
          placeholder="Salary Range (e.g. ₹30k–₹50k)"
          {...register("salary_range")}
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        />
        <p className="text-red-500 text-sm mb-2">{errors.salary_range?.message}</p>

        <select
          {...register("job_type")}
          className="w-full border-2 border-gray-300 p-3 rounded-lg mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
        <p className="text-red-500 text-sm mb-2">{errors.job_type?.message}</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting Job..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
