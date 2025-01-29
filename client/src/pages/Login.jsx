import React, { useState } from 'react'
import auth from '../assets/auth.png'

function Login() {

  const [state, setState] = useState('Sign Up')
  return (
    <div className='flex items-center justify-center min-h-screen
    px-6 sm:px-0 bg-gradient-to-br from-gray-250 to-cyan-100'>
      <img src={auth} alt="" className="absolute left-5 sm:left-20
      top-5 2-28 sm:w-32 cursor-pointer" />
      <div>
        <h2>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>
        <form>
          <img src="" alt="" />
          <input type="text" placeholder="Full Name" required />
        </form>
      </div>
    </div>
  )
}

export default Login