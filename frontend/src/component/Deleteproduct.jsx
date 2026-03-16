import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

function Deleteproduct() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/products");
        setItems(res.data);
      } catch (err) {
        toast.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://e-commerce-website-6yh3.onrender.com/api/deleteproduct/${id}`
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 px-4">
      <h1 className="text-2xl md:text-3xl font-extrabold my-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 w-full max-w-7xl">
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="flex flex-col items-center cursor-pointer p-4 rounded-lg hover:shadow-lg hover:translate-y-2 bg-white"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <img
              className="h-52 w-full md:h-60 lg:h-64 object-cover rounded"
              src={`https://e-commerce-website-6yh3.onrender.com/uploads/${item.image}`}
              alt={item.name}
            />

            <p className="text-lg md:text-xl mt-3 text-center">{item.name}</p>

            <p className="text-xl md:text-2xl">Price: ₹ {item.price}</p>

            <button
              onClick={() => {
                deleteCartItem(item._id);
              }}
              className="px-4 py-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <Trash />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Deleteproduct;