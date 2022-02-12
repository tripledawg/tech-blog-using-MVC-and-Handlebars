const controller = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

//GET all posts - Homepage

controller.get('/', async (req, res) => {
  const findAllBlogposts = await Blogpost.findAll({
    include: [
      { model: User, attributes: ['username'] }  //tells what to return about user (not password)
    ],
    attributes: ['title', 'contents', 'date_updated'],
    order: [['date_updated', 'DESC']]  //returns posts newest first so can do for each
  });
  if (findAllBlogposts) {
    const orderedBlogPosts = findAllBlogposts.map((data) => data.get({ plain: true }));
    res.render('all', {
      blog_posts: orderedBlogPosts
      // Pass the logged in flag to the template
      //res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
      // logged_in: req.session.logged_in,
    });
  }
  else {
    res.status(404).json('No blog posts found.');
  }
});
// GET new blog post page
//point to handlebars template
controller.get('/new', async (req, res) => {
  res.render('getNewBlogPost');
});

// GET single post with comments - Dashboard
controller.get('/:id', async (req, res) => {
  const singleBlogpost = await Blogpost.findByPk(req.params.id, {
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


// POST new blog post  
controller.post('/', async (req, res) => {
  await Blogpost.create(req.body);
  const findAllBlogposts = await Blogpost.findAll({
    include: [
      { model: User, attributes: ['username'] }  //tells what to return about user (not password)
    ],
    attributes: ['title', 'contents', 'date_updated'],
    order: [['date_updated', 'DESC']]  //returns posts newest first so can do for each
  });
  if (findAllBlogposts) {
    const orderedBlogPosts = findAllBlogposts.map((data) => data.get({ plain: true }));
    res.render('all', {
      blog_posts: orderedBlogPosts
      // Pass the logged in flag to the template
      // logged_in: req.session.logged_in,
    });
  }
  else {
    res.status(404).json('No blog posts found.');
  }
});

// GET one blog post to edit
controller.get('/:id/update', async (req, res) => {
  const singleBlogpost = await Blogpost.findByPk(req.params.id, {
    attributes: ['title', 'contents'],
  });
  if (singleBlogpost) {
    const post = singleBlogpost.get({ plain: true });
    res.render('onePostToEdit', { post: post });
  }
  else {
    res.status(404).json('No blog posts found.');
  }
});

// PUT update existing blog post
controller.put('/:id', async (req, res) => {
  // update blogpost data
  await Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  const singleBlogpost = await Blogpost.findByPk(req.params.id, {
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

// DELETE one post
controller.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Blogpost.destroy({ where: { id: req.params.id } })
    .then((blogpost) => {

      res.status(200).json(blogpost);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = controller;