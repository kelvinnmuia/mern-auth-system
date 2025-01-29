import React, { useState } from 'react'
import auth from '../assets/auth.png'
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";


function Login() {

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='flex items-center justify-center min-h-screen
    px-6 sm:px-0 bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img src={auth} alt="" className="absolute left-5 sm:left-20
      top-5 2-28 sm:w-32 cursor-pointer" />
      <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-full sm:w-96 
      text-cyan-100 text-sm" >
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className="text-center text-sm mb-6">{state === 'Sign Up' ? 'Create your account' :
          'Login to your account!'}</p>
        <form>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5
           rounded-full bg-[#333A5C]">
              <CiUser className="text-gray-300" />
              <input
                onChange={e => setName(e.target.value)}
                className="bg-transparent outline-none text-gray-300" type="text"
                placeholder="Full Name" required
                value={name} />
            </div>)}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5
           rounded-full bg-[#333A5C]">
            <MdOutlineEmail className="text-gray-300" />
            <input
              onChange={e => setEmail(e.target.value)}
              className="bg-transparent outline-none text-gray-300" type="email"
              placeholder="Email Address" required
              value={email} />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5
           rounded-full bg-[#333A5C]">
            <IoLockClosedOutline className="text-gray-300" />
            <input
              onChange={e => setPassword(e.target.value)}
              className="bg-transparent outline-none text-gray-300" type="password"
              placeholder="Password" required
              value={password} />
          </div>
          <p className="mb-4 text-cyan-400 cursor-pointer">Forgot password</p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r 
          from-cyan-600 to-cyan-800 text-white font-medium">{state}</button>
        </form>
        {state === "Sign Up" ? (<p className="text-gray-400 text-center text-xs mt-4">Already have an account?
          <span onClick={() => setState('Login')} className="ml-1.5 text-cyan-400 cursor-pointer underline">Login here</span>
        </p>) : (<p className="text-gray-400 text-center text-xs mt-4">Don't have an account?
          <span onClick={() => setState('Sign Up')} className="ml-1.5 text-cyan-400 cursor-pointer underline">Sign Up</span>
        </p>)}
      </div>
    </div>
  )
}

export default Login