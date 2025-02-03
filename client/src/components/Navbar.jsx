import React, { useContext } from 'react'
import auth from '../assets/auth.png'
import { GoArrowRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

  /**
   * Navbar component renders the navigation bar for the app.
   * It contains the app logo on the left and the user's initials or a login button on the right.
   * If the user is logged in, it renders the user's initials which is a drop down menu with options to verify email and logout.
   * If the user is not logged in, it renders a login button.
   * The component uses the AppContent context to get the user data and the backend url.
   * It uses the useNavigate hook to navigate to the login page or the email verification page.
   * It uses the toastify library to show success and error messages.
   * @returns {JSX.Element}
   */
function Navbar() {

  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)

  /**
   * Sends a verification OTP to the user's email.
   * Makes a POST request to the server to send a verification OTP.
   * If the response is successful, navigates to the email verification page and shows a success message.
   * If the response is not successful, shows an error message.
   * If there is an error in making the request, shows an error message.
   */
  const sendVerificationOtp = async ()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  /**
   * Logs out the user.
   * Makes a POST request to the server to log out the user.
   * If the request is successful, logs the user out and redirects to the homepage.
   * If the request is not successful, shows an error message.
   */
  const logout = async ()=>{
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(data.message)
    }
  }

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={auth} alt="The App logo" className="w-28 sm:w-32" />
      {userData ?
      <div className="w-8 h-8 flex justify-center items-center rounded-full
      bg-black text-white relative group">
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
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
