const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('message', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        message: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        user: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        }
    },
    {
        freezeTableName: true
    });
};