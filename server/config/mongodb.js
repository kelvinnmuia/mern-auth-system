import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Asynchronously connects to the MongoDB database using the Mongoose library.
 * 
 * Listens for the 'connected' event on the Mongoose connection and logs a success message when the connection is established.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
const connectDB = async ()=>{
    
    mongoose.connection.on('connected', ()=>console.log("Database Connected Successfully"));
    
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth-system`)
};

export default connectDB;