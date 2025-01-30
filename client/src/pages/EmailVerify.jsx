import React from 'react'
import auth from '../assets/auth.png'
import { useNavigate } from 'react-router-dom';

function EmailVerify() {
  return (
    <div className='flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img onClick={()=>navigate('/')} src={auth} alt="" className="absolute left-5 sm:left-20
            top-5 2-28 sm:w-32 cursor-pointer" />

    </div>
  )
}

export default EmailVerify
