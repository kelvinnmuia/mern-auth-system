import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

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

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        }

        await transporter.sendMail(mailOption);

        res.json({ success: true, message: 'Verification OTP sent on Email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

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

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}