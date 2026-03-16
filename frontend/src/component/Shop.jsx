import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Shop() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  function handlebuynow(id) {
    navigate(`/buynow/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/products");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center bg-gray-200">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-2xl sm:text-3xl font-extrabold my-6"
        >
          All Products
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 w-full max-w-7xl"
        >
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center p-4 rounded-lg hover:shadow-lg hover:translate-y-2 bg-white"
            >
              <img
                onClick={() => goToProduct(item._id)}
                className="h-56 w-full object-cover rounded-md cursor-pointer"
                src={`https://e-commerce-website-6yh3.onrender.com/uploads/${item.image}`}
                alt={item.name}
              />

              <p className="text-lg mt-2 font-medium text-center">
                {item.name}
              </p>

              <p className="text-xl font-semibold">
                Price: ₹ {item.price}
              </p>

              <button
                onClick={() => {
                  handlebuynow(item._id);
                }}
                className="px-4 py-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition w-full"
              >
                Buy Now
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      <div className='w-full flex flex-wrap justify-center gap-6 bg-gray-200 py-10'>
      
      <motion.div
      initial={{ x:-100, opacity:0 }}
      whileInView={{ x:0, opacity:1 }}
      transition={{ duration: 3}}
      viewport={{ once: true }}
      className='w-[90%] sm:w-[45%] md:w-[22%] rounded-lg bg-gray-100 shadow-lg hover:scale-105 p-4'>
      
      <p className='font-medium text-2xl'>Shop</p>
      <br/>
      <p className='font-medium'>
      Notebooks <br/>
      Pens & Pencils <br/>
      Wrapping Papers <br/>
      Greeting Cards <br/>
      Limited Edition <br/>
      New Arrivals
      </p>
      
      </motion.div>
      
      <motion.div
      initial={{ x:-100, opacity:0 }}
      whileInView={{ x:0, opacity:1 }}
      transition={{ duration: 3}}
      viewport={{ once: true }}
      className='w-[90%] sm:w-[45%] md:w-[22%] rounded-lg shadow-lg bg-gray-100 hover:scale-105 p-4'>
      
      <p className='font-medium text-2xl'>Opening Hours</p>
      <br/>
      <p className='font-medium'>
      Mon - Fri: 7am - 10pm <br/>
      Saturday: 8am - 10pm <br/>
      Sunday: 8am - 11pm
      </p>
      
      </motion.div>
      
      <motion.div
      initial={{ x:100, opacity:0 }}
      whileInView={{ x:0, opacity:1 }}
      transition={{ duration: 3}}
      viewport={{ once: true }}
      className='w-[90%] sm:w-[45%] md:w-[22%] rounded-lg bg-gray-100 shadow-lg hover:scale-105 p-4'>
      
      <p className='font-medium text-2xl'>Store Policy</p>
      <br/>
      <p className='font-medium'>
      Shipping Policy <br/>
      Refund Policy <br/>
      Privacy Policy <br/>
      Accessibility Statement <br/>
      Terms & Conditions <br/>
      FAQ
      </p>
      
      </motion.div>
      
      <motion.div
      initial={{ x:100, opacity:0 }}
      whileInView={{ x:0, opacity:1 }}
      transition={{ duration: 3}}
      viewport={{ once: true }}
      className='w-[90%] sm:w-[45%] md:w-[22%] rounded-lg bg-gray-100 shadow-lg hover:scale-105 p-4'>
      
      <p className='font-medium text-2xl'>Come Visit</p>
      <br/>
      <p className='font-medium'>
      Mohali, Kharar <br/>
      Chandigarh <br/>
      bhindadhiman80@gmail.com <br/>
      86997-07446
      </p>
      
      </motion.div>
      
      </div>
    </>
  );
}

export default Shop;