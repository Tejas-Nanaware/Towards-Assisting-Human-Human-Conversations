const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('users', {
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        FirstName: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        LastName: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        Email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        Password: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        CreatedAt: {
            allowNull: false,
            type: DataTypes.DATE(6),
            unique: false
        },
        UpdatedAt: {
            allowNull: false,
            type: DataTypes.DATE(6),
            unique: false
        },
    },
    {
        freezeTableName: true
    });
};