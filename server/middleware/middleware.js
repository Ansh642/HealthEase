const JWT = require('jsonwebtoken');
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // Check if Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "JWT token is missing",
            });
        }

        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
      
        // Attach decoded user data to request object
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid JWT token",
        });
    }
};


exports.isDoctor = async(req, res, next) => {
    try{
      const {userType} = req.user;

      if(userType!=="Doctor")
        {
            return res.status(200).json({
                success: false,
                message: "Protected route for doctor",
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


