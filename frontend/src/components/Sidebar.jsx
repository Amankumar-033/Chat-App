import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div>
      <form action="" className='flex items-center gap-2'>
        <input className='input input-bordered rounded-md' type="text"  placeholder='Search...'/>
        <button type='submit' className='btn bg-zinc-500'> <BiSearchAlt2 className='w-6 h-6 outline-none'/> </button>
        </form>
    </div>
  )
}

export default Sidebar
