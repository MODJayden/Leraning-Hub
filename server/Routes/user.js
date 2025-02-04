const express = require("express");
const { registerUser, loginUser, logout,changePassword } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/update/:id", changePassword);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.userInfo;
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: user,
  });
});


module.exports = router;

