import React, { useState } from "react";
import regisback from "../assets/regisback.jpg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Join() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  function handlelogin() {
    navigate("/login");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlejoin = async (data) => {
    try {
      const res = await axios.post(
        "https://e-commerce-website-6yh3.onrender.com/api/register",
        data,{withCredentials: true}
      );
       const role = res.data.role;
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setMessage(res.data.message);
      toast.success("Register Successfully ✅");
      reset();

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error("Register Failed ❌");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div
        className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${regisback})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
            Registration Form
          </h2>

          <form
            onSubmit={handleSubmit(handlejoin)}
            className="flex flex-col gap-4 sm:gap-5"
          >
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm sm:text-base">
                Enter Your User Name
              </label>
              <input
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102"
                {...register("name", {
                  required: "User name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Only letters are allowed",
                  },
                })}
                type="text"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm sm:text-base">
                Enter Your Email
              </label>
              <input
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                    message: "Invalid email format",
                  },
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
                {isSubmitting ? "Joining..." : "Join"}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm sm:text-base font-medium">
            Already have an account?
            <button
              onClick={handlelogin}
              className="ml-2 text-blue-700 font-semibold"
            >
              Log In
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

export default Join;