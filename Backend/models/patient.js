const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');  

const Patient = sequelize.define('Patient', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6], 
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]*$/,  
    },
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,  
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'patient',  
    validate: {
      isIn: [['patient']],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending', 
    validate: {
      isIn: [['Pending', 'Under Treatment', 'Recovered']],
    },
  },
}, {
  timestamps: true,  
});

module.exports = Patient;
