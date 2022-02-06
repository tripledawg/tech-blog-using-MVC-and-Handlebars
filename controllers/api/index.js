const controller = require('express').Router();
const blogPostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

controller.use('/blogposts', blogPostRoutes);
controller.use('/comments', commentRoutes);
controller.use('/users', userRoutes);

module.exports = controller;
