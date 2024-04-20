const JWT = require('jsonwebtoken');
require("dotenv").config();


exports.auth = async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
      
    } catch (error) {
      console.log(error);
    }
};


