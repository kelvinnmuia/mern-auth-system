import React from 'react'
import { Routes, Route } from 'react-router-dom' 
import Login from './pages/Login'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * The main App component that renders the entire application.
 * 
 * This component uses React Router to route the user to the correct page based on the URL.
 * 
 * The ToastContainer is used to display any toast notifications.
 * 
 * The Routes component from React Router is used to define the routes for the application.
 * 
 * The Home, Login, EmailVerify, and ResetPassword components are used as the elements for each route.
 */
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
