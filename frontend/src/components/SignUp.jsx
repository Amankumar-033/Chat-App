import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const [user, setUser] = useState({
    fullName : "",
    userName : "",
    password : "",
    confirmPassword : "",
    gender : "",
  });

  const handleCheckBox = (gender) => {
    setUser({...user, gender});
  }

  const onSubmitHandler = (e)=> {
    e.preventDefault();
     setUser({
    fullName : "",
    userName : "",
    password : "",
    confirmPassword : "",
    gender : "",
  });
    
  }

  return (
    <div className='min-w-96 max-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>SignUp</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input value={user.fullName} onChange={(e) => setUser({...user, fullName:e.target.value})} className='w-full input input-bordered h-10' type='text' placeholder='Full Name'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>User Name</span>
            </label>
            <input value={user.userName} onChange={(e) => setUser({...user, userName:e.target.value})}  className='w-full input input-bordered h-10' type='text' placeholder='User Name'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} className='w-full input input-bordered h-10' type='text' placeholder='Password'/>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm-Password</span>
            </label>
            <input value={user.confirmPassword} onChange={(e) => setUser({...user, confirmPassword:e.target.value})}  className='w-full input input-bordered h-10' type='text' placeholder='Confirm-Password'/>
          </div> 
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input type="checkbox" checked={user.gender === "male"} onChange={() => handleCheckBox("male")} defaultChecked className="checkbox mx-2" /> 
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input type="checkbox" checked={user.gender === "female"} onChange={() => handleCheckBox("female")} defaultChecked className="checkbox mx-2" /> 
            </div>
          </div>
          <div className='w-full mx-auto flex items-center text-center'>
            <p className='text-center my-2'>Already have an account ? <Link to="/login"> login </Link> </p>
          </div>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'> SignUp </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
