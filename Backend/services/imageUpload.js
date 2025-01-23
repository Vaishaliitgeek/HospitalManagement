const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Generate a unique file name
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept only images
    } else {
      cb(new Error('File is not an image'), false); // Reject non-image files
    }
  },
}).single('image'); // Expect 'image' to be the field name in the form-data

// Middleware to handle the image upload and return the image URL
const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
    req.imageUrl = imageUrl; // Save the image URL to the request object

    next(); // Proceed to the next middleware (createDoctor controller)
  });
};

module.exports = { uploadImage };

