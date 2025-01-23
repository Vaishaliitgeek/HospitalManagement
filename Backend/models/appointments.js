const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');  

const Appointment = sequelize.define('Appointment', {
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false, 
  },
  appointmentTime: {
    type: DataTypes.TIME,
    allowNull: false, 
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending', 
    validate: {
      isIn: [['Pending', 'Accepted', 'Cancelled']],
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: 'Patients',
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: 'Doctors',
      key: 'id',
    },
  },
}, {
  timestamps: true, 
});

module.exports = Appointment;