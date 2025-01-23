const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); 

const Doctor = sequelize.define(
  'Doctor',
  {
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
   
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]*$/,
      },
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
   
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'doctor', 
      validate: {
        isIn: [['doctor']], 
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Doctor;
