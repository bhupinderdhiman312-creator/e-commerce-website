import React, { useState } from "react";
import loginback from "../assets/loginback.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function handlejoin() {
    navigate("/join");
  }

  const handlelogin = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        data,
        { withCredentials: true }
      );

      const role = res.data.role;
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login Successfully ✅");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed ❌");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <>
      <ToastContainer position="top-center" />

      <div
        className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${loginback})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
            Login Form
          </h2>

          <form
            onSubmit={handleSubmit(handlelogin)}
            className="flex flex-col gap-4 sm:gap-5"
          >
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm sm:text-base">
                Enter Your Email
              </label>

              <input
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102"
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Enter your Email"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm sm:text-base">
                Enter Your Password
              </label>

              <input
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102"
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter your password"
                disabled={isSubmitting}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="h-10 w-full bg-gray-600 text-white rounded-xl hover:scale-105 transition hover:bg-gray-800"
              >
                {isSubmitting ? "Logging..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm sm:text-base font-medium">
            Don’t have an account?
            <button
              onClick={handlejoin}
              className="ml-2 text-blue-700 font-semibold"
            >
              Register Here
            </button>
          </p>

          {message && (
            <p className="mt-3 text-center text-blue-800 text-sm">
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default Login;