const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Log the entire headers object
 
    const authHeader = req?.headers?.authorization;
    
 
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.split(" ")[1];
 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log("Error in authMiddleware:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = authMiddleware;