const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Head = require('../models/head');
const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const fs = require('fs');
const path = require('path');
// const bcrypt = require('bcrypt');


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user;
    let role;

    user = await Head.findOne({ where: { email } });
    if (user) role = 'head';

    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      if (user) role = 'doctor';
    }

    if (!user) {
      user = await Patient.findOne({ where: { email } });
      if (user) role = 'patient';
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role !== 'head') {
      if (!password) {
        return res.status(400).json({ message: 'Password is required for doctors and patients' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    }

    const token = jwt.sign(
      { id: user.id, role },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role,
      user,
      // user: {
      //   id: user.id,
      //   email: user.email,
      //   firstName: user.firstName || null,
      //   lastName: user.lastName || null,
      // },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Common Controller for Creating Entities
// const SignupController = async (req, res, entityName, Model, requiredFields) => {
//   console.log(req.body, `Creating ${entityName}`);

//   try {
//     // Extract only required fields from the request body
//     const entityData = {};
//     for (const field of requiredFields) {
//       if (!req.body[field]) {
//         return res
//           .status(400)
//           .json({ message: `Field '${field}' is required.` });
//       }
//       entityData[field] = req.body[field];
//     }

//     // Check if the email is already in use
//     const existingEntity = await Model.findOne({ where: { email: entityData.email } });
//     if (existingEntity) {
//       return res.status(400).json({ message: 'Email is already in use.' });
//     }

//     // Hash password if the entity requires one
//     if (entityData.password) {
//       const salt = await bcrypt.genSalt(10);
//       entityData.password = await bcrypt.hash(entityData.password, salt);
//     }

//     // Handle additional entity-specific logic (e.g., image)
//     if (req.imageUrl) {
//       entityData.image = req.imageUrl;
//     }

//     // Create the entity
//     const entity = await Model.create(entityData);

//     res.status(201).json({ message: `${entityName} created successfully`, entity });
//   } catch (error) {
//     console.error(`Error creating ${entityName}:`, error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   createPatient: (req, res) => {
//     createEntity(req, res, 'Patient', Patient, [
//       'firstName',
//       'lastName',
//       'email',
//       'password',
//       'phone',
//       'dob',
//       'gender',
//     ]);
//   },
//   createDoctor: (req, res) => {
//     createEntity(req, res, 'Doctor', Doctor, [
//       'firstName',
//       'lastName',
//       'email',
//       'password',
//       'phone',
//       'specialization',
//     ]);
//   },
// };

const SearchController = async (req, res) => {
  console.log("rrrrrrrrrrrr");
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, "your-secret-key");
    const { id, role } = decoded; 

    let user;

    if (role === 'patient') {
      user = await Patient.findByPk(id);
    } else if (role === 'doctor') {
      user = await Doctor.findByPk(id);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in SearchController:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



const updateProfileController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, "your-secret-key");
    const { id, role } = decoded;

    let user;
    if (role === 'patient') {
      user = await Patient.findByPk(id);
    } else if (role === 'doctor') {
      user = await Doctor.findByPk(id);
    }

    if (!user) {
      return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found.` });
    }

    let { firstName, lastName, email, phone, gender, specialization, password } = req.body;

    // Trim any leading/trailing spaces from email and phone
    // email = email ? email.trim() : '';
    // phone = phone ? phone.trim() : '';

    // // Validation for email (if updated)
    // if (email && email !== user.email) {
    //   const existingUser = role === 'doctor' ? await Doctor.findOne({ where: { email } }) : await Patient.findOne({ where: { email } });
    //   if (existingUser) {
    //     return res.status(400).json({ message: 'Email is already in use.' });
    //   }
    // }

    // Hash the password if it is provided
    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Handle the image upload (if present)
    let imageUrl = user.image;
    if (req.file) {
      if (imageUrl) {
        const oldImagePath = path.join(__dirname, '..', imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `uploads/${req.file.filename}`;
    }

    // Update the user's profile
    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      phone: phone || user.phone,
      gender: gender || user.gender,
      specialization: specialization || user.specialization,
      password: hashedPassword,
      image: imageUrl || user.image,
    });

    res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} updated successfully`, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};








module.exports = { loginController,SearchController,updateProfileController};

