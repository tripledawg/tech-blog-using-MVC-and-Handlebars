const controller = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

// POST new comment
controller.post('/', async (req, res) => {
        //res.render('gallery', { gallery, loggedIn: req.session.loggedIn });

 const newComment = await Comment.create(req.body);
 const singleBlogpost = await Blogpost.findByPk(newComment.blogpost_id, {
  include: [
    {
      model: Comment, attributes: ['contents', 'date_updated'], order: [['date_updated', 'DESC']]
    },
    { model: User, attributes: ['username'] }
  ],
  attributes: ['title', 'contents', 'date_updated'],
});
if (singleBlogpost) {
  const post = singleBlogpost.get({ plain: true });
  res.render('onePostWithComments', { post: post });
}
else {
  res.status(404).json('No blog posts found.');
}
  
});

module.exports = controller;