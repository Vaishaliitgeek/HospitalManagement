const express = require('express');
// const {createDoctor,loginDoctor}=require('../controllers/doctorcontroller.js')
const {createPatient,getAllPatients,loginPatient}=require('../controllers/Patientcontroller.js')
const {createAppointment}=require('../controllers/appointmentcontroller.js')
const {getAppointbyPatientid}=require('../controllers/appointmentcontroller.js');

// const { uploadImage } = require('../services/imageUpload.js');
const router = express.Router();

router.post('/createPatient', createPatient);
router.post('/loginPatient',loginPatient)
router.post('/createAppointment',createAppointment);
router.get('/getappointment/:patientId',getAppointbyPatientid);
router.get('/getallpatients',getAllPatients)


module.exports = router;
