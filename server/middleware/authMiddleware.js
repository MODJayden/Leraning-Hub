const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    

    if (!token) {
      res.status(404).json({
        success: false,
        message: "Unauthorized users cant access",
      });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_CODE);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log("Unauthorized user");
  }
};

module.exports = authMiddleware;
