const router = require('express').Router();
const { Blogpost, Comment, User } = require('../../models');

router.get('/', async (req, res) => {
    const findAllBlogposts = await Blogpost.findAll({
      include: [
        { model: User },
        { model: Comment }
      ]
    });
    if (findAllBlogposts) {
      res.status(200).json(findAllBlogposts);
    }
    else {
      res.status(404).json('No blog posts found.');
    }
  });

  router.post('/', (req, res) => {
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

  router.put('/:id', (req, res) => {
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

  router.delete('/:id', (req, res) => {
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