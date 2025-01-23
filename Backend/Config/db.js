const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hospital', 'root', 'Mysql1234', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, 
  logging: false, 
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticate();

module.exports = sequelize;