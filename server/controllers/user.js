const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const checkExistingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (checkExistingUser) {
      return res.json({
        success: false,
        message: "Email or phone already exist ",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong try again",
      });
    }
    res.status(200).json({
      success: true,
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error occurred whiles creating account", error.message);
    res.status(500).json({
      message: "internal error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email does not exist, create account",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(404).json({
        success: false,
        message: "Wrong password, try again",
      });
    }
    const token =await jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.SECRET_CODE,
      { expiresIn: "360m" }
    );

    
    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.log("Error occurred while logging user", error.message);
    res.status(401).json({
      success: false,
      message: "Error occurred while logging user",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email does not exist, create account",
      });
    }

    const checkPassword = await bcrypt.compare(currentPassword, user.password);

    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Wrong password, try again",
      });
    }
    const checkNewPassword = newPassword === confirmPassword;
    if (!checkNewPassword) {
      return res.json({
        success: false,
        message: "Current password does not match with confirm password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({
      success: true,
      message: "Password updated successsfully",
    });
  } catch (error) {
    console.log("Error occurred while updating user", error.message);
    return res.status(401).json({
      success: false,
      message: "Error occurred while updating user",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

module.exports = { registerUser, loginUser, logout, changePassword };
