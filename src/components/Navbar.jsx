import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-700 text-white p-2'>
        <div className="logo">
            <span className="font-bold text-xl italic mx-20">iTask</span>
        </div>
        <ul className="flex gap-10 mx-40">
            <li className='cursor-pointer hover:font-bold hover:underline hover:text-black transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:underline hover:text-black transition-all duration-50'>Your Tasks</li>
        </ul>
      
    </nav>
  )
}

export default Navbar
