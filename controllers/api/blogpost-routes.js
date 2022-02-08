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
controller.post('/', (req, res) => {
  Blogpost.create(req.body)
    .then((blogpost) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      //     if (req.body.tagIds.length) {
      //       const productTagIdArr = req.body.tagIds.map((tag_id) => {
      //         return {
      //           product_id: product.id,
      //           tag_id,
      //         };
      //       });
      //       return ProductTag.bulkCreate(productTagIdArr);
      //     }
      //     // if no product tags, just respond
      //     res.status(200).json(product);
      //   })
      //   .then((productTagIds) => res.status(200).json(productTagIds))
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(400).json(err);
    });
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
controller.put('/:id', (req, res) => {
  // update blogpost data
  Blogpost.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((blogpost) => {
      //     // find all associated tags from ProductTag
      //     return ProductTag.findAll({ where: { product_id: req.params.id } });
      //   })
      //   .then((productTags) => {
      //     // get list of current tag_ids
      //     const productTagIds = productTags.map(({ tag_id }) => tag_id);
      //     // create filtered list of new tag_ids
      //     const newProductTags = req.body.tagIds
      //       .filter((tag_id) => !productTagIds.includes(tag_id))
      //       .map((tag_id) => {
      //         return {
      //           product_id: req.params.id,
      //           tag_id,
      //         };
      //       });
      //     // figure out which ones to remove
      //     const productTagsToRemove = productTags
      //       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      //       .map(({ id }) => id);

      //     // run both actions
      //     return Promise.all([
      //       ProductTag.destroy({ where: { id: productTagsToRemove } }),
      //       ProductTag.bulkCreate(newProductTags),
      //     ]);
      //   })
      //   .then((updatedProductTags) => res.json(updatedProductTags))
      //   .catch((err) => {
      //     res.status(400).json(err);
    });
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