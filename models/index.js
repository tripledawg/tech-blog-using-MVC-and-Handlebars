const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');


Blogpost.hasMany(Comment, {
  foreignKey: 'blogpost_id',
});

Comment.belongsTo(Blogpost);

module.exports = { User, Blogpost, Comment };