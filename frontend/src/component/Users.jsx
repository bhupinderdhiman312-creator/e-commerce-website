import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/showuser");
        setItems(res.data);
      } catch (err) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/deleteuser/${id}`
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        All Users
      </h1>

      {/* TABLE VIEW (Desktop / Tablet) */}
      <div className="hidden md:block bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-blue-600 text-white font-semibold py-3 px-4">
          <p>Name</p>
          <p>Email</p>
          <p>Role</p>
          <p className="text-center">Action</p>
        </div>

        {items.map((item) => {
          const isAdmin = item.role?.toLowerCase() === "admin";

          return (
            <div
              key={item._id}
              className={`grid grid-cols-4 items-center py-3 px-4 border-b
              ${isAdmin ? "bg-green-100" : "hover:bg-gray-50"}`}
            >
              <p className="font-medium wrap-break-words">{item.name}</p>
              <p className="wrap-break-words">{item.email}</p>

              <p
                className={`capitalize font-semibold ${
                  isAdmin ? "text-green-700" : ""
                }`}
              >
                {item.role}
              </p>

              <div className="flex justify-center">
                <button
                  disabled={isAdmin}
                  onClick={() => !isAdmin && deleteCartItem(item._id)}
                  className={`p-2 rounded-md
                  ${
                    isAdmin
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden flex flex-col gap-4">
        {items.map((item) => {
          const isAdmin = item.role?.toLowerCase() === "admin";

          return (
            <div
              key={item._id}
              className={`bg-white rounded-lg shadow p-4
              ${isAdmin ? "bg-green-100" : ""}`}
            >
              <p className="font-semibold">Name:</p>
              <p className="mb-2 wrap-break-words">{item.name}</p>

              <p className="font-semibold">Email:</p>
              <p className="mb-2 wrap-break-words">{item.email}</p>

              <p className="font-semibold">Role:</p>
              <p
                className={`mb-3 capitalize font-semibold ${
                  isAdmin ? "text-green-700" : ""
                }`}
              >
                {item.role}
              </p>

              <button
                disabled={isAdmin}
                onClick={() => !isAdmin && deleteCartItem(item._id)}
                className={`w-full py-2 rounded-md flex justify-center items-center gap-2
                ${
                  isAdmin
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <Trash size={18} />
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;