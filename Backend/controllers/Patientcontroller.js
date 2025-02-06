const Patient = require("../models/patient.js");
const Head=require('../models/head.js');
const Doctor=require("../models/doctor.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const createPatient = async (req, res) => {
  // console.log(req.body, "reqqq"); 

  try {
    const { firstName, lastName, email, password,phone,dob,gender } = req.body;

    if (!firstName || !lastName || !email || !password ||!phone || !dob || !gender ) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const existingPatient = await Patient.findOne({ where: { email } });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const patient = await Patient.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, 
      phone,
      dob,
      gender,
    });

    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    console.error('Error creating PAtient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();  
    res.json({ patients });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};



const loginPatient = async (req, res) => {
  console.log(req.body, 'Login Request');

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const patient = await Patient.findOne({ where: { email } });

    if (!patient) {
      return res.status(400).json({ message: 'patient not found.' });
    }

    const isMatch = await bcrypt.compare(password,patient.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // const token = jwt.sign(
    //   { id: doctor.id, email: doctor.email, role: doctor.role },
    //   process.env.JWT_SECRET,  // secret key ko yahan pass karein
    //   { expiresIn: '1h' }  // Optional: Token ki expiry time set karein
    // );
    const token = jwt.sign(
      { id:patient.id, email:patient.email, role: patient.role },
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



// const loginController = async (req, res) => {
//   console.log(req.body,"request")
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     let user;
//     let role;

//     // Check in Head, Doctor, and Patient
//     user = await Head.findOne({ where: { email } });
//     if (user) role = 'head';

//     if (!user) {
//       user = await Doctor.findOne({ where: { email } });
//       if (user) role = 'doctor';
//     }

//     if (!user) {
//       user = await Patient.findOne({ where: { email } });
//       if (user) role = 'patient';
//     }

//     // If user not found
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate Password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT with role
//     const token = jwt.sign(
//       { id: user.id, role }, 
//       'your-secret-key', 
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       role,
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName || null,
//         lastName: user.lastName || null,
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };



module.exports={createPatient,getAllPatients,loginPatient};

