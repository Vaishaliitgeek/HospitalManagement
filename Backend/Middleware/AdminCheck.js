const jwt = require('jsonwebtoken');

// const authenticateAdmin = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, 'your-secret-key'); // Verify with admin's secret key
//     if (decoded.role !== 'head') {
//       return res.status(403).json({ message: 'Access denied. Not an admin' });
//     }

//     req.admin = decoded;  // Attach admin info to request object
//     next();  // Proceed to the next middleware/controller

//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(401).json({ message: 'Invalid or expired admin token' });
//   }
// };


const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'your-secret-key'); 
    if (decoded.role !== 'head') {
      return res.status(403).json({ message: 'Access denied. Not an admin' });
    }

    req.admin = decoded;  
    next();  

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired admin token' });
  }
};

module.exports = { authenticateAdmin };
