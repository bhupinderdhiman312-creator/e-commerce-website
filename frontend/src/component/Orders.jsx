import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
        All Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No Orders Found</p>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <img
                src={`https://e-commerce-website-6yh3.onrender.com/uploads/${order.image}`}
                alt="product"
                className="h-60 sm:h-72 lg:h-80 w-full object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-3">
                {order.productName}
              </h3>

              <p className="text-gray-600">₹ {order.price}</p>

              <p className="text-sm mt-2">
                <span className="font-medium">productName:</span> {order.productname}
              </p>

              <p className="text-sm mt-2">
                <span className="font-medium">customerName:</span> {order.customername}
              </p>

              <p className="text-sm mt-2">
                <span className="font-medium">Email:</span> {order.email}
              </p>

              <p className="text-sm">
                <span className="font-medium">Address:</span>{" "}
                <span className="text-blue-600 wrap-break-words">
                  {order.address}
                </span>
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </motion.div>
          ))}

        </div>

      )}
    </div>
  );
}

export default Orders;