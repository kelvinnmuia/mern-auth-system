import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

/**
 * The Home component renders the homepage of the website.
 * It contains a Navbar and a Header and displays a background image.
 */
function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
    bg-[url('/bg.jpg')] bg-cover bg-center">
        <Navbar />
        <Header />
    </div>
  )
}

export default Home
