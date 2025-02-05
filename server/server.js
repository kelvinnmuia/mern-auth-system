import express from "express";
import cors from "cors"
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
/**
 * The port number on which the server will listen.
 * It is either taken from the environment variable `PORT` or defaults to 4000.
 * @type {number}
 */
const port = process.env.PORT || 4000
connectDB();

/**
 * An array of allowed origins for CORS (Cross-Origin Resource Sharing).
 * These origins are permitted to access resources on the server.
 * 
 * @type {string[]}
 * @constant
 */
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/', (req, res)=>res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`))
