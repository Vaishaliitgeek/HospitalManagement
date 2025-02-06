// const jwt = require('jsonwebtoken');
// const Doctor = require('../models/doctor'); 

// const authenticateDoctor = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token,'your-secret-key');

//     const doctor = await Doctor.findByPk(decoded.id);
//     if (!doctor) {
//       return res.status(403).json({ message: 'Access denied. Doctor not found.' });
//     }

    
//     req.user = {
//       id: doctor.id,
//       email: doctor.email,
//       role: 'doctor',
//     };

//     next(); 
//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(401).json({ message: 'Invalid or expired token.' });
//   }
// };

// module.exports = {authenticateDoctor};


const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; // Attach decoded token data to req.user

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = {authMiddleware};
