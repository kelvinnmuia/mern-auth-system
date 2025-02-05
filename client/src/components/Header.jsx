import React, { useContext } from 'react'
import developer from '../assets/developer.png'
import { MdWavingHand } from "react-icons/md";
import { AppContent } from '../context/AppContext';

/**
 * The Header component renders a header with a welcome message, a product tour, and a get started button.
 *
 * It uses the `AppContent` context to access the user data, and displays the user's name if available.
 *
 * The component is styled to be centered and have a max width of 36rem.
 *
 * The component is exported as the default export.
 */
function Header() {

  const {userData} = useContext(AppContent)

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center
    text-gray-800">
      <img src={developer} alt="header image" className='w-36 h-36 mb-6' />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl
      font-medium mb-2">Hey {userData ? userData.name : 'Buddy'}!
      <MdWavingHand className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to our platform</h2>
      <p className="mb-8 max-w-md">Let's start with a quick product tour and we will have you up and running in no time!</p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5
      hover:bg-gray-100 transition-all">Get Started</button>
    </div>
  )
}

export default Header
