import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function Buynow() {
  const { id } = useParams();
  const [productitem, setproductitem] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://e-commerce-website-6yh3.onrender.com/api/products/${id}`);
        setproductitem(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const onsubmit = async (data) => {
    try {
      const res = await axios.post("https://e-commerce-website-6yh3.onrender.com/api/buynow/add", {
        productname: productitem.name,
        price: productitem.price,
        image: productitem.image,
        customername: data.customername,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

      toast.success("Order Placed Successfully ✅");

      setMessage(res.data.message);
      reset();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      toast.error("Something Went Wrong ❌");
      setMessage(err.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="min-h-screen flex justify-center items-center bg-gray-200 px-4 py-8">
        <motion.form
          onSubmit={handleSubmit(onsubmit)}
          encType="multipart/form-data"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 p-6 md:p-8 w-full max-w-xl bg-white rounded-2xl shadow-xl"
        >

          <div>
            {productitem && (
              <div
                key={productitem._id}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <img
                  src={`https://e-commerce-website-6yh3.onrender.com/uploads/${productitem.image}`}
                  alt={productitem.name}
                  className="h-24 w-24 md:h-28 md:w-28 object-cover rounded mb-2"
                />
                <div className="p-2 md:p-4 text-center sm:text-left">
                  <h1 className="font-semibold">{productitem.name}</h1>
                  <h1 className="text-blue-600 font-bold">
                    ₹{productitem.price}
                  </h1>
                </div>
              </div>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-700">
            Buy Now
          </h2>

          {/* Name */}
          <input
            {...register("customername", { required: "customername is required" })}
            placeholder="Enter your Name"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-102"
          />
          {errors.customername && (
            <p className="text-red-500 text-sm">{errors.customername.message}</p>
          )}

          {/* Email */}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            placeholder="Enter your Email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-102"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Phone */}
          <input
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Enter valid phone number" },
            })}
            type="tel"
            placeholder="Enter phone Number"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-102"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* Address */}
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Enter your Address"
            rows="3"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-102"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          {/* State */}
          <input
            {...register("state", { required: "State is required" })}
            type="text"
            placeholder="Enter your State"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 hover:scale-102"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-600 text-white font-medium p-3 rounded-lg hover:bg-gray-800 transition duration-300 hover:scale-102"
          >
            {isSubmitting ? "Submitting..." : "Submit "}
          </button>

          {message && (
            <p className="text-center text-blue-600 font-medium">
              {message}
            </p>
          )}
        </motion.form>
      </div>
    </>
  );
}

export default Buynow;