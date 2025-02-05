import React, { useContext, useEffect } from 'react'
import auth from '../assets/auth.png'
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * EmailVerify component handles the verification of a user's email by entering a 6-digit code 
 * that is sent to the user's email address.
 * 
 * @returns {JSX.Element}
 */
function EmailVerify() {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  /**
   * Handle input event for email verification input fields.
   * If the input field has a value and is not the last field, focus the next input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input event
   * @param {number} index - Index of the input field
   */
  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  /**
   * Handles the key down event for the email verification input fields.
   * If the key pressed is the backspace key and the input field is empty and is not the first field,
   * focus the previous input field.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Key down event
   * @param {number} index - Index of the input field
   */
  const handleKeyDown = (e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }

  /**
   * Handle paste event for the email verification input fields.
   * Splits the pasted string into an array of characters and assigns each character
   * to the corresponding input field.
   * @param {React.ClipboardEvent<HTMLInputElement>} e - Paste event
   */
  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  /**
   * Handles the submission of the email verification form.
   * 
   * 1. Prevents the default form submission behavior.
   * 2. Joins the values of the input fields into a single string.
   * 3. Makes a POST request to the server to verify the account.
   * 4. If the response is successful, shows a success message and redirects to the homepage.
   * 5. If the response is not successful, shows an error message.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const onSubmitHandler = async (e)=>{
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', 
        {otp}
      )

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen 
    bg-gradient-to-br from-gray-200 to-cyan-100'>
      <img onClick={()=>navigate('/')} src={auth} alt="" className="absolute left-5 sm:left-20
            top-5 sm:w-32 cursor-pointer" />
            <form onSubmit={onSubmitHandler} className='bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm'>
              <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
              <p className="text-center mb-6 text-cyan-100">Enter the 6-digit code sent to your email address.</p>
              <div className="flex justify-between mb-8" onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index)=>(
                  <input type="text" maxLength='1' key={index} required
                  className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl 
                  rounded-md'
                  ref={e => inputRefs.current[index] = e}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e)=> handleKeyDown(e, index)}
                  />
                ))}
              </div>
              <button className='w-full py-3 bg-gradient-to-r from-cyan-600
              to-cyan-800 text-white rounded-full'>Verify email</button>
            </form>
    </div>
  )
}

export default EmailVerify
