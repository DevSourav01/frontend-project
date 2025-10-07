import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("🟢 Trying to sign in with:", data.email);

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      console.log("Auth response:", authData, authError);

      if (authError) throw authError;

      // Check employers table
      const { data: employerData, error: dbError } = await supabase
        .from("employers")
        .select("*")
        .eq("company_email", data.email)
        .single();

      console.log("Employer table response:", employerData, dbError);

      if (dbError || !employerData) {
        await supabase.auth.signOut();
        throw new Error("No employer account found with this email");
      }

      toast.success("✅ Login successful! Welcome back!", {
        position: "top-right",
        autoClose: 1500,
      });
      navigate("/employer-dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-green-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Employer Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="border-2 border-gray-300 w-full p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
        />
        <p className="text-red-500 text-sm mb-4">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border-2 border-gray-300 w-full p-3 rounded-lg mb-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
        />
        <p className="text-red-500 text-sm mb-6">{errors.password?.message}</p>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/employer-signup")}
            className="text-green-600 font-semibold hover:underline cursor-pointer hover:text-green-700"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default EmployerLogin;
