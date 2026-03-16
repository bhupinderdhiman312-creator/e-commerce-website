import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  function handlebuynow(id) {
    navigate(`/buynow/${id}`);
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const addcart = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/cart", {
        name: data.name,
        price: data.price,
        image: data.image,
      });
      toast.success("Product Added to Cart successfully 🛒");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-200 p-4 sm:p-6 gap-8">

      {/* IMAGE */}
      <motion.div
        className="p-4 rounded-lg w-full lg:w-auto flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src={`http://localhost:3000/uploads/${product.image}`}
          alt={product.name}
          className="w-full max-w-md lg:max-w-xl h-auto object-cover rounded-lg shadow-md"
        />
      </motion.div>

      {/* PRODUCT DETAILS */}
      <motion.div
        className="p-4 sm:p-6 rounded-lg max-w-xl w-full"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          {product.name}
        </h1>

        <p className="mb-4 text-gray-700 text-sm sm:text-base">
          {product.discription}
        </p>

        <p className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-green-500 mt-2">
          ₹ {product.price}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">

          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition w-full sm:w-auto"
            onClick={() => {
              addcart(product);
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={() => handlebuynow(product._id)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition w-full sm:w-auto"
          >
            Buy Now
          </button>

        </div>
      </motion.div>

    </div>
  );
}

export default Product;