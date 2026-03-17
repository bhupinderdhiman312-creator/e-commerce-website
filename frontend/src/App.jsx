import Home from "./component/Home.jsx";
import Shop from "./component/Shop.jsx";
import Navbar from "./component/Navbar.jsx";
import Join from "./component/Join.jsx";
import Login from "./component/login.jsx";
import Product from "./component/product.jsx";
import Orders from "./component/Orders.jsx";
import Users from "./component/Users.jsx";
import Userorders from "./component/Userorder.jsx";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

const [cart, setCart] = useState([]);

const addToCart = (items) => {
setCart((prevCart) => [...prevCart, items]);
};

const removeFromCart = (index) => {
setCart((prevCart) => prevCart.filter((_, i) => i !== index));
};

const router = createBrowserRouter([
{
path: "/",
element: ( <div> <Navbar cart={cart} removeFromCart={removeFromCart} /> <Home addToCart={addToCart} /> </div>
),
},
{
path: "/Shop",
element: ( <div> <Navbar cart={cart} removeFromCart={removeFromCart} /> <Shop /> </div>
),
},
{
path: "/join",
element: ( <div> <Join /> </div>
),
},
{
path: "/login",
element: ( <div> <Login /> </div>
),
},
{
path: "/products/:id",
element: ( <div> <Navbar /> <Product /> </div>
),
},
{
path: "/Orders",
element: ( <div> <Orders /> </div>
),
},
{
path: "/userorders",
element: ( <div> <Userorders /> </div>
),
},
{
path: "/Users",
element: ( <div> <Users /> </div>
),
},
]);

return ( <div> <RouterProvider router={router} /> <Toaster position="top-center" reverseOrder={false} /> <ToastContainer position="top-center" /> </div>
);
}

export default App;
