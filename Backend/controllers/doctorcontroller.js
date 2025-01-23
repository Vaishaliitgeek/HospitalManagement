const bcrypt = require('bcrypt');
const { uploadImage } = require('../services/imageUpload.js');
const Doctor = require('../models/doctor.js');
const Patient=require('../models/patient.js')
const Appointment=require('../models/appointments.js')
const jwt = require('jsonwebtoken'); 


// Create Doctor
const createDoctor = async (req, res) => {
  console.log(req.body, "reqqq"); 

  try {
    const { firstName, lastName, email, phone, specialization, password } = req.body;

    if (!firstName || !lastName || !email || !specialization || !password) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUrl = req.imageUrl || null; 

    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      phone,
      specialization,
      password: hashedPassword, 
      image: imageUrl,  
    });

    res.status(201).json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Login Doctor
const loginDoctor = async (req, res) => {
  console.log(req.body, 'Login Request');

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
      return res.status(400).json({ message: 'Doctor not found.' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // const token = jwt.sign(
    //   { id: doctor.id, email: doctor.email, role: doctor.role },
    //   process.env.JWT_SECRET,  // secret key ko yahan pass karein
    //   { expiresIn: '1h' }  // Optional: Token ki expiry time set karein
    // );
    const token = jwt.sign(
      { id: doctor.id, email: doctor.email, role: doctor.role },
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

// Doctor BY specialization
const getDoctorBySpecialization= async (req, res) => {
  const { specialization } = req.query;
  try {
    const doctors = await Doctor.findAll({ where: { specialization } });
    res.json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();  
    res.json({ doctors });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

const updatePatientStatus = async (req, res) => {
  try {
    const { patientId } = req.params; 
    const { status } = req.body; 

    if (!status || (status !== 'Under Treatment' && status !== 'Recovered')) {
      return res
        .status(400)
        .json({ message: 'Invalid status. Allowed values: Under Treatment, Recovered' });
    }

    const patient = await Patient.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.status = status;
    await patient.save();

    res.status(200).json({
      message: 'Patient status updated successfully',
      patient,
    });
  } catch (error) {
    console.error('Error updating patient status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// const updateAppointmentStatus=async(req,res)=>{

// }


const updateAppointmentStatus = async (req, res) => {
  console.log(req.body,"rdfnnlnkl")
  try {
    const { appointmentId } = req.params; 
    const { status } = req.body; 
    const doctorId = req.user.id; 

    // Validate status
    if (!status || (status !== 'Pending' && status !== 'Completed' && status !== 'Cancelled')) {
      return res.status(400).json({
        message: 'Invalid status. Allowed values: Pending, Completed, Cancelled',
      });
    }

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctorId !== doctorId) {
      return res.status(403).json({ message: 'You are not authorized to update this appointment' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: 'Appointment status updated successfully',
      appointment,
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const updateAppointmentStatus2 = async (req, res) => {
  console.log(req.body,"rdfnnlnkl")
  try {
    const { appointmentId } = req.params; 
    const { status } = req.body; 
    const doctorId = req.user.id; 

    // Validate status
    if (!status || (status !== 'Pending' && status !== 'Accepted' && status !== 'Cancelled')) {
      return res.status(400).json({
        message: 'Invalid status. Allowed values: Pending, Completed, Cancelled',
      });
    }

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.doctorId !== doctorId) {
      return res.status(403).json({ message: 'You are not authorized to update this appointment' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: 'Appointment status updated successfully',
      appointment,
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};







module.exports = { createDoctor,loginDoctor,getDoctorBySpecialization,getAllDoctors,updatePatientStatus,  updateAppointmentStatus,updateAppointmentStatus2};
