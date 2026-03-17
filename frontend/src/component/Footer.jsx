import React from 'react'
import Insta from "../assets/Insta.jpg"
import Linkdin from "../assets/Link.jpg"
import Msg from "../assets/Msg.jpg"
import { motion } from 'framer-motion'

function Footer() {
  return (
    <div>
      <div className='w-full flex justify-center items-center bg-gray-200 py-10'>
        <div className='w-full max-w-3xl text-center'>

          <motion.p
            initial={{ opacity: 5, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 5 }}
            className='font-medium text-black'
          >
            @2026 Bhupinder Singh. All Rights Reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 5, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 5 }}
            className='flex justify-center gap-3 mt-3'
          >
            <img src={Insta} alt="" className='h-8 w-8 md:h-10 md:w-10 rounded-2xl' />
            <img src={Linkdin} alt="" className='h-8 w-8 md:h-10 md:w-10 rounded-2xl' />
            <img src={Msg} alt="" className='h-8 w-8 md:h-10 md:w-10 rounded-2xl' />
          </motion.div>

          <motion.p
            initial={{ opacity: 5, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 5 }}
            className='font-medium text-black mt-3'
          >
            Built with using React.js
          </motion.p>

        </div>
      </div>
    </div>
  )
}

export default Footer