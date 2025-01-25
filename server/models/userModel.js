import mongoose from "mongoose";

/**
 * User Schema
 * 
 * This schema defines the structure of the User document in the MongoDB database.
 * 
 * @property {String} name - The name of the user. This field is required.
 * @property {String} email - The email of the user. This field is required and must be unique.
 * @property {String} password - The password of the user. This field is required.
 * @property {String} verifyOtp - The OTP for verifying the user's account. Default is an empty string.
 * @property {Number} verifyOtpExpireAt - The expiration time for the verify OTP. Default is 0.
 * @property {Boolean} isAccountVerified - Indicates if the user's account is verified. Default is false.
 * @property {String} resetOtp - The OTP for resetting the user's password. Default is an empty string.
 * @property {Number} resetOtpExpireAt - The expiration time for the reset OTP. Default is 0.
 */
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0},
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;