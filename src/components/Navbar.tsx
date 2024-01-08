import React from "react"
import { Link } from "react-router-dom"
import '../App.css'



const Navbar = () => {



  return (
    <nav className='navbar bg-orange-400 text-white'>
    <div>
    <Link to='/' className="link m-3 font-semibold" >Home</Link>
    <Link to='/products'className="link m-3 font-semibold ">Winter Sale</Link>
    </div>
    <div className='search flex justify-center m-2 text-gray-500'>
            <div className='rounded-lg bg-white'>
            <input type="text" className=' m-1 pl-1 '/>
            </div>
            <button className='m-1'>🔎</button>
         </div>
   </nav>
  )
}
export default Navbar