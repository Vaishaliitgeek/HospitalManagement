const express = require('express');
const {createHead,loginHead}=require('../controllers/headcontroller')
const {getAllAppointments}=require('../controllers/appointmentcontroller')
const router = express.Router();

// Route for creating a Head
router.post('/createhead', createHead);
router.get('/getallappointments',getAllAppointments)
router.post('/headLogin',loginHead)
module.exports = router;
