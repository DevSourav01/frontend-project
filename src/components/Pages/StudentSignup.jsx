import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  skills: yup.string().required("Skills are required"),
  location: yup.string().required("Location is required"),
  portfolio: yup.string().url("Enter a valid URL").optional(),
});

const StudentSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Student Profile Data:", data);
    alert("Student profile created successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Student Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills</label>
          <input
            {...register("skills")}
            placeholder="React, Node.js, UI/UX"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.skills?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            {...register("location")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.location?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Portfolio (optional)</label>
          <input
            {...register("portfolio")}
            placeholder="https://portfolio.com"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <p className="text-red-500 text-sm">{errors.portfolio?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default StudentSignup;
