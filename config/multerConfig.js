const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
require("dotenv").config(); // To load environment variables

// Initialize S3Client for AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION, // e.g., 'ap-southeast-2'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer with multer-s3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // Replace with your bucket name
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname }); // Include additional metadata if needed
    },
    key: (req, file, cb) => {
      // Generate a unique file name
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `images/${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Restrict file types to images only
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(file.mimetype);

    if (extName) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

module.exports = upload;
