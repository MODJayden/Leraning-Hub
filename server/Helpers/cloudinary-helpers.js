const cloudinary = require("cloudinary").v2;
const multer = require("multer");
cloudinary.config({
  cloud_name: process.env.API_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new multer.memoryStorage();

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.log(
      "something went wrong while uploading product to cloudinary",
      error
    );
  }
};

const upload = multer({ storage });

module.exports = { uploadToCloudinary, upload };
