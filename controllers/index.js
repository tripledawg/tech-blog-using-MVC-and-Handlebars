const controller = require('express').Router();
const apiRoutes = require('./api');

controller.use('/api', apiRoutes);

controller.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = controller;