import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Trash, Menu } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [showImage, setShowImage] = useState(false);
  const token = localStorage.getItem("token");
  let userName = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.name;
    } catch (e) {
      console.log("Invalid token");
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      await axios.post("https://e-commerce-website-6yh3.onrender.com/api/logout", {}, {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      toast.success("Log Out Successfully ✅");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/cart");
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  });

  const deleteCartItem = async (id) => {
    try {
      const res = await axios.delete(`https://e-commerce-website-6yh3.onrender.com/api/cart/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div className='w-full flex flex-row items-center justify-between bg-gray-300 shadow-lg px-3 sm:px-6 py-2 gap-4'>

        {/* LEFT */}
        <div className='flex items-center gap-4'>

          <div className='flex items-center ml-[30px]'>
            <img
              onClick={() => setShowImage(true)}
              src={logo}
              alt=""
              className='h-12 w-12 rounded-full cursor-pointer'
            />

            {showImage && (
              <div
                onClick={() => setShowImage(false)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-10"
              >
                <img
                  src={logo}
                  alt="Big view"
                  className="max-w-[80%] max-h-[80%] rounded-lg shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* ✅ MOBILE MENU (3 line) */}
          <div className="dropdown sm:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Shop">Shop</Link></li>
            </ul>
          </div>

          {/* DESKTOP MENU */}
          <div className='hidden sm:flex gap-4 text-sm sm:text-base font-semibold ml-[80px]'>
            <Link to="/" className='hover:text-blue-600 transition duration-100 font-semibold'> Home </Link>
            <Link to="/About" className='hover:text-blue-600 transition duration-100 font-semibold'> About </Link>
            <Link to="/Shop" className='hover:text-blue-600 transition duration-100 font-semibold'> Shop </Link>
          </div>

        </div>

        {/* RIGHT (UNCHANGED) */}
        <div className='flex items-center gap-3 sm:gap-6'>

          <details className="dropdown">
            <summary className="btn bg-transparent shadow-none border-none text-black font-bold flex items-center">
              <User />
              <span className="hidden sm:inline font-bold">Account</span>
            </summary>

            <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">
              {!localStorage.getItem("token") && (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    <User /> LOGIN
                  </Link>
                </li>
              )}

              {localStorage.getItem("token") && (
                <li>
                  <button onClick={handlelogout} className="flex items-center gap-2">
                    <User /> LOGOUT
                  </button>
                </li>
              )}

              {localStorage.getItem("role") === "admin" && (
                <li>
                  <Link to="/admin" className="flex items-center gap-2">
                    <User /> Admin
                  </Link>
                </li>
              )}
            </ul>
          </details>

          {isLoggedIn && (
            <details className="dropdown">
              <summary className="btn bg-transparent shadow-none border-none text-black font-bold flex items-center overflow-visible">
                <User />
                <p className="hidden sm:inline whitespace-nowrap max-w-fit">
                  {userName}
                </p>
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm text-black">
                <li>
                  <Link to="/userorders" className="flex items-center gap-2">
                    <User /> Order
                  </Link>
                </li>
              </ul>
            </details>
          )}

          <div className="drawer drawer-end flex items-center">
            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-5" className="flex btn-primary bg-transparent shadow-none border-none text-black font-medium items-center gap-1 cursor-pointer">
                <ShoppingCart />
                <p className="hidden sm:inline text-black font-medium">cart</p>
              </label>
            </div>

            <div className="drawer-side">
              <label htmlFor="my-drawer-5" className="drawer-overlay"></label>

              <ul className="menu bg-base-200 min-h-full w-72 sm:w-96 p-4">
                {items.length === 0 ? (
                  <li className="text-black text-xl text-center">
                    No items in cart
                  </li>
                ) : (
                  items.map((item) => (
                    <div key={item._id} className="w-full text-black flex mt-4 justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl"
                          src={`https://e-commerce-website-6yh3.onrender.com/uploads/${item.image}`}
                          alt=""
                        />

                        <div className="text-sm sm:text-base font-bold flex flex-col">
                          {item.name}
                          <span>₹:{item.price}</span>
                        </div>
                      </div>

                      <button onClick={() => deleteCartItem(item._id)} className="p-2">
                        <Trash size={18} />
                      </button>
                    </div>
                  ))
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Navbar;