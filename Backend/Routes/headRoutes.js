const express = require('express');
const {createHead,loginHead,HeadLoginasDoctor,deleteDoctorById}=require('../controllers/headcontroller')
const {getAllAppointments}=require('../controllers/appointmentcontroller')
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const { uploadImage } = require('../services/imageUpload.js');
const {loginController,SignupController,SearchController,updateProfileController,}=require('../controllers/commoncontroller')
// const {loginController}=require('../controllers/Patientcontroller')
const router = express.Router();
const {authenticateAdmin}=require('../Middleware/AdminCheck.js')


// Route for creating a Head
router.post('/createhead', createHead);
router.get('/getallappointments',getAllAppointments)
router.post('/headLogin',loginHead)


// common routes
router.post('/login',loginController)
// router.put('/updateProfile',updateProfileController)
// router.put('/updateProfile', upload.single('image'), updateProfileController)
router.put('/updateProfile', uploadImage, updateProfileController)
// head doctor login
router.post('/impersonateDoctor/:doctorId', authenticateAdmin,HeadLoginasDoctor);
router.delete('/deleteDoctor/:doctorId',authenticateAdmin,deleteDoctorById)
// router.post('/signup',SignupController)
router.get('/search',SearchController);
module.exports = router;
