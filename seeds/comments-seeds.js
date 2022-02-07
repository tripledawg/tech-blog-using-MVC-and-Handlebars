const { Comment } = require('../models');

const commentData = [
  {
    contents: 'Test Comment 1',
    date_updated: new Date(),
    blogpost_id: 1
  },
  {
    contents: 'Test Comment 2',
    date_updated: new Date(),
    blogpost_id: 2
  },
  {
    contents: 'Test Comment 3',
    date_updated: new Date(),
    blogpost_id: 3
  },
  {
    contents: 'Test Comment 4',
    date_updated: new Date(),
    blogpost_id: 4
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
