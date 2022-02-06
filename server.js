const express = require('express');
const controllers = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');
const { original } = require('parseurl');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on ' + PORT));
});