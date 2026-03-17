import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import Shop from "./component/Shop.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Join from "./component/Join.jsx";
// import Arrives from "./component/Arrives.jsx";
// import Greeting from "./component/Greeting.jsx";
// import NoteBooks from "./component/NoteBooks.jsx";
// import Pencils from "./component/Pencils.jsx";
// import Wrapping from "./component/Wrapping.jsx";
// import Limited from "./component/Limited.jsx";
import Login from "./component/login.jsx"
import Product from "./component/product";
import Admin from "./component/Admin.jsx";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buynow from "./component/Buynow.jsx";
import Orders from "./component/Orders.jsx";
import Deleteproduct from "./component/Deleteproduct.jsx";
import Adminlayout from "./component/Adminlayout.jsx";
import Userorders from "./component/Userorder.jsx";
import Users from "./component/Users.jsx";

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
      element: (
        <div>
          <Navbar cart={cart} removeFromCart={removeFromCart} />
          <Home addToCart={addToCart} />
          <Footer />
        </div>
      ),
    },
    {
      path: "/About",
      element: (
        <div>
          <Navbar cart={cart} removeFromCart={removeFromCart} />
          <About />
          <Footer />
        </div>
      ),
    },
    {
      path: "/Navbar",
      element: (
        <div>
          <Navbar cart={cart} removeFromCart={removeFromCart} />
        </div>
      ),
    },
    {
      path: "/Shop",
      element: (
        <div>
          <Navbar cart={cart} removeFromCart={removeFromCart} />
          <Shop />
          <Footer />
        </div>
      ),
    },
    {
      path: "/join",
      element: (
        <div>
          <Join />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Login />
        </div>
      ),
    },

    {
      path: "/products/:id",
      element: (
        <div>
          <Navbar />
          <Product />
        </div>
      ),
    },

    {
      path: "/Admin",
      element: (
        <>
          <Navbar />
          <Adminlayout />
          <Footer />
        </>
      ),
      children: [
        { path: "User", element: <Users /> },
        { path: "addproduct", element: <Admin /> },
        { path: "deleteproduct", element: <Deleteproduct /> },
        { path: "orders", element: <Orders /> },
      ],
    },

    {
      path: "/buynow/:id",
      element: (
        <div>
          <Buynow />
        </div>
      ),
    },
    {
      path: "/Orders",
      element: (
        <div>
          <Orders />
        </div>
      ),
    },
    {
      path: "/deleteproduct",
      element: (
        <div>
          <Deleteproduct />
        </div>
      ),
    },
    {
      path: "/userorders",
      element: (
        <div>
          <Userorders />
        </div>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;