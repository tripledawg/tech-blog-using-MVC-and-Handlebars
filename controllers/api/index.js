const controller = require('express').Router();

//requiring api routes in subfolder
const blogPostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

//telling router/controller what endpoints to use and connecting them to api routes above
controller.use('/blogposts', blogPostRoutes);
controller.use('/comments', commentRoutes);
controller.use('/users', userRoutes);

module.exports = controller;
