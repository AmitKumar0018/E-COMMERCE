import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div>
     <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

      <div>
        <img src={assets.logo} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptas ducimus asperiores unde facilis voluptates hic veniam illo, eaque excepturi.
        </p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5 '>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>Get In Touch</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
         <li>+1-212-456-7890</li>
         <li>contactforever@you.com</li>
        </ul>
      </div>

     </div>

     <div>
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Rights Reserved</p>
        <hr />
     </div>
    </div>
  )
}

export default Footer