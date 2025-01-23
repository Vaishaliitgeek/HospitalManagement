const bcrypt = require('bcrypt');
const Head = require('../models/head'); // Import your Head model
const jwt = require('jsonwebtoken'); 

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

module.exports = { createHead,loginHead};

