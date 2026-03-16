import React from 'react'
import doltscards from "../assets/doltscards.jpg"
import birdscards from "../assets/birdscards.jpg";

function Greeting() {
  return (
    <div>
      <div className='h-30 w-full flex flex-col-reverse justify-center items-center bg-gray-200'>
        <div className='h-10 w-50 ml-20'><p className='font-medium text-2xl'> 02 Products </p></div> 
        <p className='font-extrabold text-3xl'> Greeting Cards  </p>
      </div>
      <div className='h-120 w-full flex border-t-2 bg-gray-200'>
        <div className='h-120 w-50'>
         <p className='font-semibold text-2xl ml-5'> Browse by </p>  <br /><br />
          <button className='ml-5 font-medium hover:underline'> All Products </button> <br />
          <button className='ml-5 mt-1 font-medium hover:underline'> New Arrivals </button> <br />
         <button className='ml-5 mt-1 font-medium hover:underline'> Greeting Cards </button> <br />
         <button className='ml-5 mt-1 font-medium hover:underline'> NoteBooks </button>   <br />
         <button className='ml-5 mt-1 font-medium hover:underline'> Pens & Pencils </button>  <br />
         <button className='ml-5 mt-1 font-medium hover:underline'> Wrapping Papers </button>  <br />
        <button className='ml-5 mt-1 font-medium hover:underline'> Limited Edition </button>  
      </div>
          <div className='h-120 w-fit grid grid-cols-3 items-center justify-evenly bg-gray-200'>
        <div className='h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
          <img src={ doltscards } alt="" className='h-100 w-100'/>
          <p className='font-medium bg-black text-white flex items-center h-10'> Dots Greeting Cards </p>
        </div>
         <div className='h-110 w-100 ml-8 hover:scale-103 shadow-lg'>
          <img src={ birdscards } alt="" className='h-100 w-100'/>
           <p className='font-medium bg-black text-white flex items-center h-10'> Birds Greeting Cards </p>
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

export default Greeting