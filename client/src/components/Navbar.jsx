import React, { useContext } from 'react'
import auth from '../assets/auth.png'
import { GoArrowRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'

function Navbar() {

  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={auth} alt="The App logo" className="w-28 sm:w-32" />
      {userData ?
      <div className="w-8 h-8 flex justify-center items-center rounded-full
      bg-black text-white relative group">
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-1'>
          <ul>
            <li>Verify email</li>
            <li>Logout</li>
          </ul>

        </div>
      </div>
      : <button onClick={()=>navigate('/login')}className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100
      transition-all'>Login <GoArrowRight /></button>
    }

    </div>
  )
}

export default Navbar
