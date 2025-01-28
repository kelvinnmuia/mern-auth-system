import React from 'react'
import ml from '../assets/ml.png'

function Navbar() {
  return (
    <div>
      <img src={ml} alt="The App logo" className="w-28 sm:w-32" />
      <button>Login</button>
    </div>
  )
}

export default Navbar
