const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_updated: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        //tying a comment to a user and a specific post
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogpost',
                key: 'id',
            },
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    });

module.exports = Comment;