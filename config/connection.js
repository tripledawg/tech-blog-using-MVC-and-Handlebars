const Sequelize = require('sequelize');
require('dotenv').config();

  if (process.env.JAWSDB_URL) {
    
    const sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PW,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
      },
    );
  } //[scheme://][user[:[password]]@]host[:port][/schema]

module.exports = sequelize;