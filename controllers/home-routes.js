const controller = require('express').Router();
const { Blogpost, User } = require('../models');

//GET all posts - Homepage
controller.get('/', async (req, res) => {
const findAllBlogposts = await Blogpost.findAll({
include: [
{ model: User, attributes: ['username'] } //tells what to return about user (not password)
],
attributes: ['title', 'contents', 'date_updated'],
order: [['date_updated', 'DESC']] //returns posts newest first so can do for each
});
if (findAllBlogposts) {
const orderedBlogPosts = findAllBlogposts.map((data) => data.get({ plain: true }));
res.render('all', {
blog_posts: orderedBlogPosts
});
}
else {
res.status(404).json('No blog posts found.');
}
});

module.exports = controller;
