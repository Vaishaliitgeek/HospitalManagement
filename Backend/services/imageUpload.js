// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = 'uploads';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const fileName = Date.now() + path.extname(file.originalname); 
//     cb(null, fileName);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter: (req, file, cb) => {

//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true); 
//     } else {
//       cb(new Error('File is not an image'), false); 
//     }
//   },
// }).single('image'); 


// const uploadImage = (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: err.message });
//     }

//     const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
//     req.imageUrl = imageUrl; 

//     next(); 
//   });
// };

// module.exports = { uploadImage };



const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const originalFileName = file.originalname;
    const filePath = path.join('uploads', originalFileName);

    if (fs.existsSync(filePath)) {
      return cb(new Error('File with the same name already exists'), false);
    }

    cb(null, originalFileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 }, // Limit file size to 100 KB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, or .png images are allowed'), false);
    }
  },
}).single('image');

const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle file upload errors
      return res.status(400).json({ message: err.message }); // Stop execution and respond with an error
    }

    // If no error, add image URL to the request object
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
    req.imageUrl = imageUrl;

    next(); // Proceed to the next middleware or route handler
  });
};

// module.exports = uploadImage;

module.exports = { uploadImage };

