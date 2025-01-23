const express=require('express');
const app=express();
const sequelize=require('./Config/db.js');
const PORT = process.env.PORT || 5000;
// const headController=require('./controllers/headcontroller.js')
const headRoutes=require('./Routes/headRoutes.js')
const doctorRoutes=require('./Routes/doctorRoutes.js')
const patientRoutes=require('./Routes/patientRoutes.js')
const Doctor=require('./models/doctor.js')
const Patient=require('./models/patient.js')
const Appointment=require('./models/appointments.js')
const cors = require('cors');
const path=require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors());
app.use(express.json()); 



// head
app.use('/head',headRoutes);
// doctor
app.use('/doctor',doctorRoutes)
// patient
app.use('/patient',patientRoutes)

// relationship
// oneee
// Doctor.hasMany(Patient, { foreignKey: 'doctorId' });
// Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });

// twoo
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });


// three
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });


// sequelize.sync({ alter: true });



sequelize.sync({force:false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
