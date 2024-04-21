const JWT = require('jsonwebtoken');
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
      const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
      
      if(!req.headers.authorization){
        return res.status(400).json({
          success: false,
          message: 'Please login first',
        })
      }
      req.user = decode;
      next();
      
    } catch (error) {
      console.log(error);
    }
};


