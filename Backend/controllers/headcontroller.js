const bcrypt = require('bcrypt');
const Head = require('../models/head'); // Import your Head model
const jwt = require('jsonwebtoken'); 
const Doctor=require('../models/doctor')
const Appointment=require('../models/appointments')
// const { getDoctorById } = require('../controllers/doctorController'); // assuming this function is already implemented
const {authenticateAdmin } = require('../Middleware/AdminCheck'); // assuming you have this middleware for admin authentication
const {getDoctorById}=require('../controllers/doctorcontroller')
// Create Head Controller
const createHead = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if a Head already exists
    const existingHead = await Head.findOne();
    if (existingHead) {
      return res.status(400).json({ message: 'Head user already exists.' });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the Head user
    const head = await Head.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword, // Save hashed password
      role: 'head', // Set the role explicitly
    });

    res.status(201).json({ message: 'Head user created successfully', head });
  } catch (error) {
    console.error('Error creating Head:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const loginHead = async (req, res) => {
  // console.log(req.body, 'Login Request');

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email  are required.' });
    }

    const head = await Head.findOne({ where: { email } });

    if (!head) {
      return res.status(400).json({ message: 'head not found.' });
    }

    // const isMatch = await bcrypt.compare(password, head.password);

    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials.' });
    // }
    // const token = jwt.sign(
    //   { id: doctor.id, email: doctor.email, role: doctor.role },
    //   process.env.JWT_SECRET,  // secret key ko yahan pass karein
    //   { expiresIn: '1h' }  // Optional: Token ki expiry time set karein
    // );
    const token = jwt.sign(
      { id: head.id, email: head.email, role:head.role },
      'your-secret-key',  
      { expiresIn: '1h' }  
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      // doctor: {
      //   id: doctor.id,
      //   firstName: doctor.firstName,
      //   lastName: doctor.lastName,
      //   email: doctor.email,
      //   specialization: doctor.specialization,
      //   image: doctor.image,
      // },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteDoctorById = async (req, res) => {
  console.log("delete hora h")
  const { doctorId } = req.params;  // Get doctorId from request params

  try {
    // Step 1: Check if doctor exists
    const doctor = await Doctor.findOne({ where: { id: doctorId } });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Step 2: Delete all appointments related to this doctor
    await Appointment.destroy({ where: { doctorId: doctorId } });

    // Step 3: Delete the doctor
    await doctor.destroy(); 

    res.status(200).json({ message: 'Doctor and associated appointments deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// const HeadLoginasDoctor = async (req, res) => {
//   try {
//     // Step 1: Verify Admin Token (Admin authentication)
//     const adminToken = req.header('Authorization')?.replace('Bearer ', ''); 
//     if (!adminToken) {
//       return res.status(401).json({ message: 'Access denied. No admin token provided.' });
//     }

//     // // Verify the admin token
//     const decodedAdmin = jwt.verify(adminToken, 'your-secret-key');
//     if (decodedAdmin.role !== 'head') {
//       return res.status(403).json({ message: 'You are not authorized to impersonate a doctor' });
//     }

//     // Step 2: Get Doctor ID from Request Parameters
//     const { doctorId } = req.params;  // Get doctorId from URL params
//     if (!doctorId) {
//       return res.status(400).json({ message: 'Doctor ID is required' });
//     }

//     // Step 3: Fetch Doctor from Database
//     const doctor = await getDoctorById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     // Step 4: Directly Allow Admin to Access Doctor's Data
//     res.json({
//       message: 'Admin impersonating doctor',
//       doctorData: doctor,
//       token: adminToken,  // Returning the same admin token (without impersonation)
//     });
    
//   } catch (error) {
//     console.error('Error during doctor login as admin:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const HeadLoginasDoctor = async (req, res) => {
  try {
    // Step 1: Get Doctor ID from Request Parameters
    const { doctorId } = req.params;  // Get doctorId from URL params
    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    // Step 2: Fetch Doctor from Database (using a function like getDoctorById)
    const doctor = await getDoctorById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Step 3: Return Doctor Data along with Admin Token
    res.json({
      message: 'Admin impersonating doctor',
      doctorData: doctor,
      token: req.header('Authorization')?.replace('Bearer ', '')  // Send back the token
    });
    
  } catch (error) {
    console.error('Error during doctor login as admin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




module.exports = { createHead,loginHead,HeadLoginasDoctor,deleteDoctorById};

