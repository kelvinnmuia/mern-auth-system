import userModel from "../models/userModel.js";

/**
 * Retrieves the user data from the backend and sends it to the frontend.
 *
 * Makes a GET request to the backend to fetch the user data.
 * If the response is successful, it sends a JSON response to the frontend with the user data.
 * If the response is not successful, it sends a JSON response with an error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.userId - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the request is finished.
 */
export const getUserData = async (req, res)=>{
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}