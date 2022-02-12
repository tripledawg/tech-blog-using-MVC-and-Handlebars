const controller = require('express').Router();
//requiring api folder
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
//assingning endpoint to route above
controller.use('/api', apiRoutes);
controller.use('/', homeRoutes);
module.exports = controller;