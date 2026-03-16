import React from 'react'
import onepen from "../assets/onepen.jpg";
import twopens from "../assets/twopens.jpg";
import threepen from "../assets/threepen.jpg";
import threepens from "../assets/threepens.jpg";
import fourpens from "../assets/fourpens.jpg";

function Pencils() {
  return (
    <div>
  <div className='h-30 w-full flex flex-col-reverse justify-center items-center bg-gray-200'>
    <div className='h-10 w-50 ml-20'><p className='font-medium text-2xl'> 04 Products </p></div> 
      <p className='font-extrabold text-3xl'> Pen & Pencils   </p>
   </div>
    <div className='h-250 w-full flex border-t-2 bg-gray-200'>
           <div className='h-130 w-50'>
             <p className='font-semibold text-2xl ml-5'> Browse by </p>  <br /><br />
             <button className='ml-5 font-medium hover:underline'> All Products </button> <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> New Arrivals </button> <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> Greeting Cards </button> <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> NoteBooks </button>   <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> Pens & Pencils </button>  <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> Wrapping Papers </button>  <br />
             <button className='ml-5 mt-1 font-medium hover:underline'> Limited Edition </button>  
           </div>
         <div className='h-250 w-fit grid grid-cols-3 items-center justify-evenly bg-gray-200'>
           <div className='h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
             <img src={ onepen } alt="" className='h-100 w-100'/>
             <p className='font-medium bg-black text-white flex items-center h-10'> Pen 01</p>
           </div>
           <div className='relative h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
             <img src={ threepen } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-100 hover:opacity-0'/>
             <img src={ twopens } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-0 hover:opacity-100'/>
             <p className='absolute bottom-0 left-0 h-10 w-full bg-black text-white flex items-center font-medium z-10'> Pen 02</p>
           </div>
           <div className='relative h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
             <img src={ threepen } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-100 hover:opacity-0'/>
             <img src={ threepens } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-0 hover:opacity-100'/>
             <p className='absolute bottom-0 left-0 h-10 w-full bg-black text-white flex items-center font-medium z-10'>Pen 03</p>
           </div>
           <div className='relative h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
             <img src={ threepen } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-100 hover:opacity-0'/>
             <img src={ fourpens } alt="" className='h-100 w-100 absolute object-cover transition-opacity opacity-0 hover:opacity-100'/>
             <p className='absolute bottom-0 left-0 h-10 w-full bg-black text-white flex items-center font-medium z-10'>Pen 04</p>
           </div>
           
         </div>
         </div>
    <div className='h-80 w-ful flex justify-around bg-gray-200'>
        <div className='h-80 w-85 shadow-2xl hover:scale-103'>
          <p className='font-medium text-2xl ml-3 mt-3'> Shop </p> <br /><br />
          <p className='font-medium ml-3'> Notebooks  <br />
              Pens & Pencils  <br />
              Wrapping Papers    <br />
              Greeting Cards    <br />
              Limited Edition   <br />
              New Arrivals</p>
        </div>
        <div className='h-80 w-85 shadow-2xl hover:scale-103'>
          <p className='font-medium text-2xl ml-3 mt-3'> Opening Hours </p> <br /><br />
          <p className='font-medium ml-3'> Mon - Fri: 7am - 10pm   <br />
              Saturday: 8am - 10pm   <br />
              Sunday:  8am - 11pm</p>
        </div>
        <div className='h-80 w-85 shadow-2xl hover:scale-103'>
          <p className='font-medium text-2xl ml-3 mt-3'> Store Policy </p> <br /><br />
          <p className='font-medium ml-3'> Shipping Policy   <br />
              Refund Policy     <br /> 
              Privacy Policy     <br />
              Accessibility Statement   <br />
              Terms & Conditions     <br />
              FAQ</p> <br />
            </div>
        <div className='h-80 w-85 shadow-2xl hover:scale-103'>
          <p className='font-medium text-2xl ml-3 mt-3'> Come Visit </p>   <br /><br />
          <p className='font-medium ml-3'> Mohali, Kharar  <br />
              Chandigarh.    <br />
              bhindadhiman80@gmail.com     <br /> 
              86997-07446</p>  <br /><br />
      
    </div>
    </div>
    </div>
  )
}

export default Pencils