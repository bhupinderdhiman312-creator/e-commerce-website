import React, { useEffect, useState } from "react";
import axios from "axios";

function Userorders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/orders", { withCredentials: true});
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
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
            >

              <img
                src={`https://e-commerce-website-6yh3.onrender.com/uploads/${order.image}`}
                alt="product"
                className="h-56 sm:h-64 lg:h-72 w-full object-cover rounded-md"
              />

              <h3 className="text-lg font-semibold mt-3">
                {order.productName}
              </h3>

              <p className="text-gray-600">₹ {order.price}</p>

              <p className="text-sm mt-2 wrap-break-words">
                <span className="font-medium">Product Name:</span> {order.productname}
              </p>

              <p className="text-sm mt-2 wrap-break-words">
                <span className="font-medium">Customer Name:</span> {order.customername}
              </p>

              <p className="text-sm mt-2 wrap-break-words">
                <span className="font-medium">Email:</span> {order.email}
              </p>

              <p className="text-sm wrap-break-words">
                <span className="font-medium">Address:</span>{" "}
                <span className="text-blue-600">{order.address}</span>
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Userorders;