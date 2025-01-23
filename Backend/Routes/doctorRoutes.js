const express = require('express');
const {createDoctor,loginDoctor,getDoctorBySpecialization,getAllDoctors,updatePatientStatus,updateAppointmentStatus,updateAppointmentStatus2}=require('../controllers/doctorcontroller.js')
const {getAppointbyDoctorid}=require('../controllers/appointmentcontroller.js');
const { uploadImage } = require('../services/imageUpload.js');
const {authenticateDoctor}=require('../Middleware/AuthenticateDoctor.js')
const router = express.Router();

router.post('/createDoctor', uploadImage,createDoctor);
router.post('/loginDoctor',loginDoctor);
router.get('/getDoctorBySpecialization',getDoctorBySpecialization)
router.get('/getAppointByDoctor/:doctorId',getAppointbyDoctorid)
router.get('/getAllDoctors',getAllDoctors)
router.put('/updatePatientStatus/:patientId',authenticateDoctor,updatePatientStatus)
// router.put('/updateAppointmentStatus/:appointmentId',authenticateDoctor, updateAppointmentStatus);
router.put('/updatestatus/:appointmentId',authenticateDoctor,updateAppointmentStatus2)

module.exports = router;
