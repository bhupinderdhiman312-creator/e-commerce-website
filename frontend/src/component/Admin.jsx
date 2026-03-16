import { useState } from "react";
import { useForm } from "react-hook-form";
import backgroundimage from "../assets/backgroundimage.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Admin() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("discription", data.discription);
      formData.append("image", data.image[0]);

      const res = await axios.post(
        "http://localhost:3000/api/admin",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(res.data.message);
      console.log(data);

      reset();
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="main min-h-screen w-full flex justify-center items-center bg-cover bg-center p-4"
        style={{ backgroundImage: `URL(${backgroundimage})` }}
      >
        <motion.form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onsubmit)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col p-6 md:p-10 gap-4 w-full max-w-md bg-white/80 rounded-lg shadow-lg"
        >
          <label className="font-semibold text-gray-700">
            {errors.name ? (
              <p className="text-red-600">{errors.name.message}</p>
            ) : (
              "User Name"
            )}
          </label>

          <input
            className="p-2 border-2 border-gray-500 rounded outline-none hover:scale-102 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("name", {
              required: "name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Only letters are allowed",
              },
            })}
            placeholder="Enter your product name"
            type="text"
          />

          <label className="font-semibold text-gray-700">
            {errors.price ? (
              <p className="text-red-600">{errors.price.message}</p>
            ) : (
              "Price"
            )}
          </label>

          <input
            className="p-2 border-2 border-gray-500 rounded outline-none hover:scale-102 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("price", {
              required: "price is required",
            })}
            placeholder="Enter your price"
            type="number"
          />

          <label className="font-semibold text-gray-700">
            {errors.discription ? (
              <p className="text-red-600">{errors.discription.message}</p>
            ) : (
              "Discription"
            )}
          </label>

          <input
            className="p-2 border-2 border-gray-500 rounded outline-none hover:scale-102 
            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            {...register("discription", {
              required: "price is required",
            })}
            placeholder="Enter your discription"
            type="text"
          />

          <label className="font-semibold text-gray-700">
            {errors.Image ? (
              <p className="text-red-600">{errors.image.message}</p>
            ) : (
              "Image"
            )}
          </label>

          <input
            className="p-2 border-2 border-gray-500 rounded outline-none hover:scale-102 
            transition cursor-pointer"
            {...register("image", {
              required: "img is required",
            })}
            type="file"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-600 mt-3 text-white p-2 w-full md:w-80 rounded-lg hover:bg-gray-800 transition hover:scale-103"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>

          {message && <p>{message}</p>}
        </motion.form>
      </div>
    </>
  );
}

export default Admin;