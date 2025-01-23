const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Head = sequelize.define(
  'Head',
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'head', 
      validate: {
        isIn: [['head']], 
      },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (head) => {
        const existingHead = await Head.findOne();
        if (existingHead) {
          throw new Error('Head already exists. You cannot create another Head user.');
        }
      },
    },
  }
);

module.exports = Head;

