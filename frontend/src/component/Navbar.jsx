import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, Trash, Menu } from "lucide-react";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

function Navbar() {

  const [showImage, setShowImage] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

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

  const handlelogout = async () => {
    try {

      await axios.post(
        "https://e-commerce-website-6yh3.onrender.com/api/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);

      toast.success("Log Out Successfully ✅");

      setTimeout(() => navigate("/login"), 1500);

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

  }, []);

  const deleteCartItem = async (id) => {

    try {

      const res = await axios.delete(
        `https://e-commerce-website-6yh3.onrender.com/api/cart/${id}`
      );

      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success(res.data.message);

    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (

<>
<ToastContainer position="top-center" />

<div className="w-full  flex items-center justify-between px-4 md:px-10 h-14 bg-gray-300 shadow-lg">

{/* LOGO */}

<div className="flex ml-20 items-center gap-2">

<img
onClick={() => setShowImage(true)}
src={logo}
alt=""
className="h-12 w-12 rounded-full cursor-pointer"
/>

{showImage && (
<div
onClick={() => setShowImage(false)}
className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
>

<img
src={logo}
alt="Big view"
className="max-w-[80%] max-h-[80%] rounded-lg shadow-2xl"
/>

</div>
)}

</div>


{/* MOBILE MENU */}

<div className="dropdown md:hidden">

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

<div className="hidden md:flex gap-8 font-semibold ml-20 w-90 justify-evenly">

<Link to="/" className="hover:text-blue-600">Home</Link>
<Link to="/About" className="hover:text-blue-600">About</Link>
<Link to="/Shop" className="hover:text-blue-600">Shop</Link>

</div>


{/* RIGHT SIDE */}

<div className="flex items-center gap-3">

{/* ACCOUNT */}

<details className="dropdown dropdown-end">

<summary className="btn bg-transparent border-none shadow-none text-black flex items-center gap-1">

<User />
<span className="hidden sm:block">Account</span>

</summary>

<ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow text-black">

{!localStorage.getItem("token") && (

<li>
<Link to="/login" className="flex gap-2 items-center">
<User /> LOGIN
</Link>
</li>

)}

{localStorage.getItem("token") && (

<li>
<button onClick={handlelogout} className="flex gap-2 items-center">
<User /> LOGOUT
</button>
</li>

)}

{localStorage.getItem("role") === "admin" && (

<li>
<Link to="/admin" className="flex gap-2 items-center">
<User /> Admin
</Link>
</li>

)}

</ul>

</details>


{/* USER NAME */}

{isLoggedIn && (

<details className="dropdown dropdown-end">

<summary className="btn bg-transparent border-none shadow-none text-black flex items-center gap-1">

<User />
<span className="hidden sm:block">{userName}</span>

</summary>

<ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow text-black">

<li>
<Link to="/userorders" className="flex gap-2 items-center">
<User /> Orders
</Link>
</li>

</ul>

</details>

)}


{/* CART */}

<div className="drawer drawer-end">

<input id="cart-drawer" type="checkbox" className="drawer-toggle" />

<div className="drawer-content">

<label
htmlFor="cart-drawer"
className="btn bg-transparent border-none shadow-none text-black flex items-center gap-1"
>

<ShoppingCart />
<span className="hidden sm:block">Cart</span>

</label>

</div>

<div className="drawer-side">

<label htmlFor="cart-drawer" className="drawer-overlay"></label>

<ul className="menu bg-base-200 min-h-full w-72 p-4">

{items.length === 0 ? (

<li className="text-center text-xl font-semibold">

No items in cart

</li>

) : (

items.map((item) => (

<div
key={item._id}
className="flex justify-between items-center mt-4"
>

<div className="flex gap-3 items-center">

<img
className="h-16 w-16 rounded-lg"
src={`https://e-commerce-website-6yh3.onrender.com/uploads/${item.image}`}
alt=""
/>

<div className="text-sm font-semibold">

{item.name}
<br />
₹ {item.price}

</div>

</div>

<button onClick={() => deleteCartItem(item._id)}>

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