import React, { useContext, useState } from 'react'
import auth from '../assets/auth.png'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmail } from 'react-icons/md'
import { IoLockClosedOutline } from 'react-icons/io5'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

/*************  ✨ Codeium Command ⭐  *************/
/**
 * ResetPassword component handles the password reset process for a user.
 * 
 * 1. Allows the user to request a password reset by entering their registered email address.
 * 2. Sends a 6-digit OTP to the user's email and allows the user to submit the OTP for verification.
 * 3. Once the OTP is verified, allows the user to set a new password.
 * 4. Provides navigation back to the login page upon successful password reset.
 * 
 * Utilizes various handlers for input events, form submissions, and OTP management.
 * 
 * @returns {JSX.Element}
 */

/******  e35c0304-e12a-44fe-94b8-3af4795aa561  *******/
function ResetPassword() {

  const {backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true

  const Navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

  const inputRefs = React.useRef([])

  /**
   * Handle input event for password reset OTP input fields.
   * If the input field has a value and is not the last field, focus the next input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input event
   * @param {number} index - Index of the input field
   */
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  /**
   * Handles the key down event for the password reset OTP input fields.
   * If the key pressed is the backspace key and the input field is empty and is not the first field,
   * focus the previous input field.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Key down event
   * @param {number} index - Index of the input field
   */
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  /**
   * Handle paste event for the password reset OTP input fields.
   * Splits the pasted string into an array of characters and assigns each character
   * to the corresponding input field.
   * @param {React.ClipboardEvent<HTMLInputElement>} e - Paste event
   */
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

/**
 * Handles the submission of the email form for password reset.
 * 
 * 1. Prevents the default form submission behavior.
 * 2. Sends a POST request to the server to send a reset OTP to the provided email.
 * 3. If the response is successful, shows a success message and updates the email sent state.
 * 4. If the response is not successful, shows an error message.
 * 
 * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
 */

  const onSubmitEmail = async (e)=>{
    e.preventDefault();

    try{
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', 
        {email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
    } catch(error) {
      toast.error(error.message)
    }

  }

  /**
   * Handles the submission of the password reset OTP form.
   * 
   * 1. Prevents the default form submission behavior.
   * 2. Joins the values of the input fields into a single string.
   * 3. Updates the state of the OTP and otp submitted.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const onSubmitOtp = async (e)=>{
    e.preventDefault();

    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmited(true)
  }

  /**
   * Handles the submission of the new password form.
   * 
   * 1. Prevents the default form submission behavior.
   * 2. Makes a POST request to the server to reset the user's password.
   * 3. If the response is successful, shows a success message and redirects to the login page.
   * 4. If the response is not successful, shows an error message.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', 
        {email, otp, newPassword}
      )

      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && Navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img onClick={() => Navigate('/')} src={auth} alt="" className="absolute left-5 sm:left-20
                  top-5 sm:w-32 cursor-pointer" />
      
      {!isEmailSent && 
      <form onSubmit={onSubmitEmail} className='bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
        <p className="text-center mb-6 text-cyan-100">Enter your registered email address</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <MdOutlineEmail className="text-gray-300" />
          <input type='email' placeholder='Email Address'
            className='bg-transparent outline-none text-gray-300'
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-cyan-600
      to-cyan-800 text-white rounded-full mt-3">Submit</button>
      </form>
}

{!isOtpSubmited && isEmailSent &&
      <form onSubmit={onSubmitOtp} className='bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password OTP</h1>
        <p className="text-center mb-6 text-cyan-100">Enter the 6-digit code sent to your email address.</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength='1' key={index} required
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl 
                  rounded-md'
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-cyan-600
              to-cyan-800 text-white rounded-full'>Submit</button>
      </form>
}

{isOtpSubmited && isEmailSent &&
      <form onSubmit={onSubmitNewPassword} className='bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className="text-white text-2xl font-semibold text-center mb-4">New Password</h1>
        <p className="text-center mb-6 text-cyan-100">Enter the new password below</p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <IoLockClosedOutline className="text-gray-300" />
          <input type='password' placeholder='New Password'
            className='bg-transparent outline-none text-gray-300'
            value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        </div>
        <button className="w-full py-2.5 bg-gradient-to-r from-cyan-600
      to-cyan-800 text-white rounded-full mt-3">Submit</button>
      </form>
}
    </div>
  )
}

export default ResetPassword
