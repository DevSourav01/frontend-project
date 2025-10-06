import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

const StudentLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Student Login:", data);
    navigate("/student-dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-blue-100">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Student Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border-2 border-gray-300 w-full p-3 rounded-lg mb-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <p className="text-red-500 text-sm mb-4">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border-2 border-gray-300 w-full p-3 rounded-lg mb-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        />
        <p className="text-red-500 text-sm mb-6">{errors.password?.message}</p>

        <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
          Login
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/student-signup")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer hover:text-blue-700"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default StudentLogin;