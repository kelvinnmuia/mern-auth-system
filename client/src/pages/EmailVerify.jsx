import React from 'react'
import auth from '../assets/auth.png'
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  return (
    <div className='flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img onClick={()=>navigate('/')} src={auth} alt="" className="absolute left-5 sm:left-20
            top-5 sm:w-32 cursor-pointer" />
            <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>

            </form>
    </div>
  )
}

export default EmailVerify
