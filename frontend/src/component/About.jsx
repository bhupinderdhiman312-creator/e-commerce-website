import React from 'react'
import gift from "../assets/gift.jpg";
import stationary from "../assets/stationary.jpg";
import { motion } from 'framer-motion';

function About() {
  return (
    <div>

      <div className='h-24 md:h-30 w-full flex items-center justify-center bg-gray-200'>
        <motion.p
          initial={{ opacity: 0, y:20}}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 3}}
          className='font-extrabold text-3xl md:text-5xl'
        >
          About
        </motion.p>
      </div>

      {/* Section 1 */}
      <div className='w-full flex flex-col md:flex-row items-center justify-around bg-gray-200 border-t-2 py-10 gap-6'>

        <motion.div
          initial={{ opacity: 0, y:90}}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 3}}
          className='w-[90%] md:w-[45%] hover:scale-105 shadow-lg'
        >
          <img src={gift} alt="" className='w-full h-auto bg-gray-200'/>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y:90}}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 3}}
          className='w-[90%] md:w-[45%] flex items-center hover:scale-103'
        >
          <p className='font-medium text-lg md:text-2xl'>
            This is a space to share more about your business. Explain who's behind it, what it does and what this site has to offer. <br />
            It’s an opportunity to tell the story behind the business or describe a special service or product it offers. <br /><br />
            You can use this section to share your company's history or highlight a particular feature that sets it apart from competitors.
          </p>
        </motion.div>

      </div>

      {/* Section 2 */}
      <div className='w-full flex flex-col md:flex-row items-center justify-around bg-gray-200 py-10 gap-6'>

        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='w-[90%] md:w-[45%] flex items-center hover:scale-103'
        >
          <p className='font-medium text-lg md:text-2xl'>
            We are passionate about providing premium stationery products that inspire students, professionals, and creators every day. <br />
            From colorful notebooks and smooth-writing pens to essential office supplies, our collection is carefully functionality to your workspace. <br /><br />
            Whether you're a student preparing for exams or a professional organizing your desk, we have something perfect for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='w-[90%] md:w-[45%] hover:scale-105 shadow-lg'
        >
          <img src={stationary} alt="" className='w-full h-[500px] bg-gray-200'/>
        </motion.div>

      </div>

      {/* Footer Cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-200 p-6'>

        <motion.div
          initial={{ x:-100, opacity:0 }}
          whileInView={{ x:0, opacity:1 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='p-4 rounded-lg shadow-lg hover:scale-105 bg-gray-100'
        >
          <p className='font-medium text-2xl'>Shop</p>
          <br />
          <p className='font-medium'>
            Notebooks <br />
            Pens & Pencils <br />
            Wrapping Papers <br />
            Greeting Cards <br />
            Limited Edition <br />
            New Arrivals
          </p>
        </motion.div>

        <motion.div
          initial={{ x:-100, opacity:0 }}
          whileInView={{ x:0, opacity:1 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='p-4 rounded-lg shadow-lg hover:scale-105 bg-gray-100'
        >
          <p className='font-medium text-2xl'>Opening Hours</p>
          <br />
          <p className='font-medium'>
            Mon - Fri: 7am - 10pm <br />
            Saturday: 8am - 10pm <br />
            Sunday: 8am - 11pm
          </p>
        </motion.div>

        <motion.div
          initial={{ x:100, opacity:0 }}
          whileInView={{ x:0, opacity:1 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='p-4 rounded-lg shadow-lg hover:scale-105 bg-gray-100'
        >
          <p className='font-medium text-2xl'>Store Policy</p>
          <br />
          <p className='font-medium'>
            Shipping Policy <br />
            Refund Policy <br />
            Privacy Policy <br />
            Accessibility Statement <br />
            Terms & Conditions <br />
            FAQ
          </p>
        </motion.div>

        <motion.div
          initial={{ x:100, opacity:0 }}
          whileInView={{ x:0, opacity:1 }}
          transition={{ duration: 3}}
          viewport={{ once: true }}
          className='p-4 rounded-lg shadow-lg hover:scale-105 bg-gray-100'
        >
          <p className='font-medium text-2xl'>Come Visit</p>
          <br />
          <p className='font-medium'>
            Mohali, Kharar <br />
            Chandigarh <br />
            bhindadhiman80@gmail.com <br />
            86997-07446
          </p>
        </motion.div>

      </div>

    </div>
  )
}

export default About