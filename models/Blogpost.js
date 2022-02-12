//pulling in model and datatype classes from sequelize package
const { Model, DataTypes } = require('sequelize');
//connecting sequlize to connection and .env
const sequelize = require('../config/connection');

class Blogpost extends Model {
}

Blogpost.init(
    // defining table columns
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_updated: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogpost',
    });

module.exports = Blogpost;