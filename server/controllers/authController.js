import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { PASSWORD_RESET_TEMPLATE, EMAIL_VERIFY_TEMPLATE } from '../config/emailTemplates.js';

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const register = async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        const existingUser = await userModel.findOne({email});

        if (existingUser){
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: 
            hashedPassword});
            await user.save();

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,
                { expiresIn: '7d'});

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 
                'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            
            // send welcome email
            
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to our platform',
                text: `Welcome to our platform. Your account has been created with the email id: ${email}`
            }

            await transporter.sendMail(mailOptions);
            
            return res.json({ success: true });

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

/**
 * Logs in an existing user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const login = async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {
        const user = await userModel.findOne({email});

        if (!user){
            return res.json({ success: false, message: 'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.json({ success: false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,
            { expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

/**
 * Logs out a user by clearing the token cookie.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success property (boolean) and a message property (string).
 */
export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
        })

        return res.json({ success: true, message: 'Logged Out Successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


/**
 * Sends a verification OTP to the user's email.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success 
 * property (boolean) and a message property (string).
 */
export const sendVerifyOtp = async (req, res)=>{
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({ success: false, message: "Account Already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            /*text: `Your OTP is ${otp}. Verify your account using this OTP.`*/
            html: EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', 
                user.email)
        }

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: 'Verification OTP sent on Email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

/**
 * Verifies a user's email / account.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userId - The ID of the user.
 * @param {string} req.body.otp - The OTP sent to the user's email.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success 
 * property (boolean) and a message property (string).
 */
export const verifyEmail = async (req, res)=>{
    const {userId, otp} = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    try {

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({ success: false, message: 'User not found' });
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({ success: false, message: 'OTP Expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

/**
 * Checks if a user is authenticated using a JWT token in the 'token' cookie.
 * If the user is authenticated, sends a JSON response with a success property set to true.
 * If the user is not authenticated, sends a JSON response with a success property set to false
 * and a message property set to an error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success property
 * (boolean) and a message property (string).
 */
export const isAuthenticated = async (req, res)=>{
    try  {
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

/**
 * Sends a password reset OTP to the user's email.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success property
 * (boolean) and a message property (string).
 */
export const sendResetOtp = async (req, res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            /* text: `Your OTP for resetting your password is ${otp}.
            Use this OTP to reset your password.`*/
            html: PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', 
                user.email)
        }

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: 'Password Reset OTP sent on Email' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

/**
 * Resets a user's password using the provided email, OTP, and new password.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.otp - The OTP sent to the user's email for password reset.
 * @param {string} req.body.newPassword - The new password to be set for the user.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success 
 * property (boolean) and a message property (string).
 */

export const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({ success: false, message: 'Email, OTP and new password are required' });
    }

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({ success: false, message: 'User not found' });
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}