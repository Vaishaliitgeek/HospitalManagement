const Patient=require('../models/patient');
const Doctor=require('../models/doctor');
const Appointment=require('../models/appointments');


const createAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime, reason, patientId, doctorId } = req.body;

    const patient = await Patient.findByPk(patientId);
    const doctor = await Doctor.findByPk(doctorId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      appointmentDate,
      appointmentTime,
      reason,
      patientId,
      doctorId,
    });

    res.status(201).json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the appointment", error });
  }
};


const getAppointbyDoctorid=async(req,res)=>{
  console.log("hitt get appp")
  try {
    const { doctorId } = req.params; 

    const appointments = await Appointment.findAll({
        where: {
            doctorId: doctorId
        },
        include: [{
            model: Patient,
            // attributes: ['id', 'name', 'age', 'phone', 'status'] // Patient details included
        }],
        order: [['appointmentDate', 'ASC']] // Optional: Order by appointment date
    });

    if (!appointments.length) {
        return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointments);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
}
}


const getAppointbyPatientid=async(req,res)=>{
  // console.log("hitt get appp")
  try {
    const { patientId } = req.params; 
    console.log(req.params,"reqqq")

    // Fetch appointments for the doctor
    const appointments = await Appointment.findAll({
        where: {
            patientId: patientId
        },
        include: [{
            model: Doctor,
            // attributes: ['id', 'name', 'age', 'phone', 'status'] // Patient details included
        }],
        order: [['appointmentDate', 'ASC']] // Optional: Order by appointment date
    });

    if (!appointments.length) {
        return res.status(404).json({ message: 'No appointments found for this doctor' });
    }

    res.status(200).json(appointments);
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
}
}


const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();  
    res.json({appointments});
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};





module.exports={createAppointment,getAppointbyDoctorid,getAppointbyPatientid,getAllAppointments};