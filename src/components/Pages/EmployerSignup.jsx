import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  position: yup.string().required("Your role/position is required"),
  companyWebsite: yup.string().url("Enter a valid URL").required("Website is required"),
  hiringFor: yup.string().required("Please specify the role you’re hiring for"),
});

const EmployerSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Employer Profile Data:", data);
    alert("Employer profile created successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Employer Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Company Name</label>
          <input
            {...register("companyName")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <p className="text-red-500 text-sm">{errors.companyName?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Your Role/Position</label>
          <input
            {...register("position")}
            placeholder="HR Manager, Founder, etc."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <p className="text-red-500 text-sm">{errors.position?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company Website</label>
          <input
            {...register("companyWebsite")}
            placeholder="https://company.com"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <p className="text-red-500 text-sm">{errors.companyWebsite?.message}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Hiring For</label>
          <input
            {...register("hiringFor")}
            placeholder="Frontend Developer, Designer, etc."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <p className="text-red-500 text-sm">{errors.hiringFor?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all"
        >
          Create Employer Profile
        </button>
      </form>
    </div>
  );
};

export default EmployerSignup;
