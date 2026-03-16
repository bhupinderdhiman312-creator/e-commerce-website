import React from 'react'
import notebook from "../assets/notebook.jpg";
import pens from "../assets/pens.jpg";
import wrapping from "../assets/wrapping.jpg";
import cards from "../assets/cards.jpg";
import arrivles from "../assets/arrivles.jpg";
import arrivless from "../assets/arrivless.jpg";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();

  function handlejoin(){
    navigate("/join")
  }

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://e-commerce-website-6yh3.onrender.com/api/products");
        console.log("Frontend received:", res.data);
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const addcart = async (data) => {
    try {
      const res = await axios.post("https://e-commerce-website-6yh3.onrender.com/api/cart", {
        name: data.name,
        price: data.price,
        image: data.image,
      });
      toast.success("Product Added to Cart successfully 🛒");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
<>
<ToastContainer position="top-center" />

<div>

{/* heading */}
<div className=' w-full flex justify-center bg-gray-200 py-6'>
  <div className='h-20 flex items-center justify-center'>
    <motion.p
      initial={{ opacity: 5, y:20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 3}} 
      className='text-2xl md:text-4xl font-extrabold hover:scale-105'>
      Shop Collections
    </motion.p>
  </div>
</div>

{/* collections */}
<div className='w-full flex flex-wrap justify-center gap-6 items-center bg-gray-200 border-t-2 py-10'>

<motion.div
initial={{ opacity: 5, y:90}}
animate={{ opacity: 1, y: 0}}
transition={{ duration: 3}}
className=' w-[90%] sm:w-[45%] md:w-[22%] shadow-2xl hover:scale-105'>
<img src={notebook} alt="" className='h-[320px] w-full  object-cover'/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center'>NoteBooks</p>
</motion.div>

<motion.div
initial={{ opacity: 5, y:90}}
animate={{ opacity: 1, y: 0}}
transition={{ duration: 3}}
className='w-[90%] sm:w-[45%] md:w-[22%] shadow-2xl hover:scale-105'>
<img src={pens} alt="" className='w-full h-[320px] object-cover'/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center'>Pens & Pencils</p>
</motion.div>

<motion.div
initial={{ opacity: 5, y:90}}
animate={{ opacity: 1, y: 0}}
transition={{ duration: 3}}
className='w-[90%] sm:w-[45%] md:w-[22%] shadow-2xl hover:scale-105'>
<img src={wrapping} alt="" className="w-full h-[320px] object-cover"/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center'>Wrapping Papers</p>
</motion.div>

<motion.div 
initial={{ opacity: 5, y:90}}
animate={{ opacity: 1, y: 0}}
transition={{ duration: 3}}
className='w-[90%] sm:w-[45%] md:w-[22%] shadow-md hover:scale-105'>
<img src={cards} alt="" className='w-full h-[320px] object-cover'/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center'>Greeting Cards</p>
</motion.div>

</div>

{/* whats new heading */}
<div className='w-full flex justify-center bg-gray-200 py-6'>
<div className='flex justify-center'>
<motion.p
initial={{ opacity: 5, y:20}}
animate={{ opacity: 1, y: 0}}
transition={{ duration: 3}}
className='text-2xl md:text-4xl font-extrabold hover:scale-105'>
What's New
</motion.p>
</div>
</div>

{/* whats new */}
<div className='w-full flex flex-wrap justify-center gap-6 items-center bg-gray-200 py-10'>

<motion.div
initial={{ opacity:5, y:20 }}
whileInView={{ opacity:1, y:0 }}
transition={{ duration: 3}}
viewport={{ once: true }}
className='w-[95%] md:w-[45%] shadow-2xl hover:scale-105'>
<img src={arrivless} alt="" className='w-full h-[400px] object-cover'/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center items-center'>Limited Edition</p>
</motion.div>

<motion.div
initial={{ opacity:0, y:20 }}
whileInView={{ opacity:1, y:0 }}
transition={{ duration: 3}}
viewport={{ once: true }}
className='w-[95%] md:w-[45%] shadow-2xl hover:scale-105'>
<img src={arrivles} alt="" className='w-full h-[400px] object-cover'/>
<p className='h-10 text-xl md:text-2xl font-medium bg-black text-white text-center items-center'>New Arrivals</p>
</motion.div>

</div>

{/* products */}
<div className="flex flex-wrap gap-6 justify-center p-6 bg-gray-200">

{items.map((item) => (

<div
key={item._id}
className="flex flex-col items-center cursor-pointer p-4 w-[90%] sm:w-[45%] md:w-[22%] rounded-lg hover:shadow-lg hover:-translate-y-2 transition">

<img
onClick={() => goToProduct(item._id)}
className="w-full h-[250px] object-cover"
src={`https://e-commerce-website-6yh3.onrender.com/uploads/${item.image}`}
alt={item.name}
/>

<p className="text-lg md:text-xl mt-2">{item.name}</p>

<p className="text-xl md:text-2xl">Price: ₹ {item.price}</p>

<button
onClick={() => {addcart(item)}}
className="px-4 py-2 mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition">

Add to Cart

</button>

</div>

))}

</div>

{/* register */}
<div className='w-full flex items-center justify-center bg-gray-200 py-6'>

<button
onClick={handlejoin}
className='h-12 w-[90%] md:w-[300px] rounded-2xl font-extrabold text-lg md:text-2xl bg-gray-600 text-white hover:scale-110 hover:bg-gray-800'>

Register Now

</button>

</div>

{/* footer */}
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

</div>
</>
)
}

export default Home;