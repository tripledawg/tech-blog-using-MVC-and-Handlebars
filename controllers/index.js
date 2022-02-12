const controller = require('express').Router();
//requiring api folder
const apiRoutes = require('./api');
//assingning endpoint to route above
controller.use('/api', apiRoutes);

controller.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = controller;