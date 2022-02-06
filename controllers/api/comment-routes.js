const controller = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

// POST new comment

controller.post('/', (req, res) => {
  Comment.create(req.body)
    .then((comment) => {

    });
});

module.exports = controller;