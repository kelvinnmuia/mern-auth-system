import React from 'react'
import auth from '../assets/auth.png'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmail } from 'react-icons/md'


function ResetPassword() {

  const Navigate = useNavigate()

  return (
    <div className='flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img onClick={() => Navigate('/')} src={auth} alt="" className="absolute left-5 sm:left-20
                  top-5 sm:w-32 cursor-pointer" />
      <form className='bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm'>
      <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
      <p className="text-center mb-6 text-cyan-100">Enter your registered email address</p>
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
         <MdOutlineEmail className="text-gray-300" />
        <input type='email' />
      </div>
      </form>
    </div>
  )
}

export default ResetPassword
