const express = require('express');
const {createDoctor,loginDoctor,getDoctorBySpecialization,getAllDoctors,updatePatientStatus,updateAppointmentStatus,updateAppointmentStatus2,updateDoctor,getDoctorById}=require('../controllers/doctorcontroller.js')
const {getAppointbyDoctorid}=require('../controllers/appointmentcontroller.js');
const { uploadImage } = require('../services/imageUpload.js');
const {authenticateDoctor}=require('../Middleware/AuthenticateDoctor.js')
const {authMiddleware}=require('../Middleware/AuthenticateDoctor.js')
const{impersonationMiddleware}=require('../Middleware/Adminaccess.js')

const router = express.Router();

router.post('/createDoctor', uploadImage,createDoctor);
router.post('/loginDoctor',loginDoctor);
router.get('/getDoctorBySpecialization',getDoctorBySpecialization)
router.get('/getAppointByDoctor/:doctorId',getAppointbyDoctorid)
router.get('/getAllDoctors',getAllDoctors)
// router.put('/updatePatientStatus/:patientId',authenticateDoctor,updatePatientStatus)
router.put('/updatePatientStatus/:patientId',authMiddleware,impersonationMiddleware,updatePatientStatus)
router.put('/updatestatus/:appointmentId',authMiddleware,impersonationMiddleware,updateAppointmentStatus2)


// router.put('/')

router.put('/doctorUpdate/:doctorId', uploadImage, updateDoctor);
// router.get('/doctor/:id', getDoctorById);

// router.put('/updateAppointmentStatus/:appointmentId',authenticateDoctor, updateAppointmentStatus); reject
// router.put('/updatestatus/:appointmentId',authenticateDoctor,updateAppointmentStatus2) 
       
module.exports = router;
