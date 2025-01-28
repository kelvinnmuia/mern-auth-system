import jwt from 'jsonwebtoken';

/**
 * A middleware function that verifies if the user is authenticated using a JWT token in the 'token' cookie.
 * 
 * If the token is valid, it adds the user's ID to the request body and calls the next middleware function.
 * If the token is not valid, it sends a JSON response with a success property set to false and a message indicating that the user needs to login again.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves when the middleware function is finished.
 */
const userAuth = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }else {
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }

        next();

    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}

export default userAuth;