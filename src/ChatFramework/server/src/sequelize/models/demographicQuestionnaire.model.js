const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('demographicQuestionnaire', {
        ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        ListName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        ListValues: {
            allowNull: true,
            type: DataTypes.TEXT,
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