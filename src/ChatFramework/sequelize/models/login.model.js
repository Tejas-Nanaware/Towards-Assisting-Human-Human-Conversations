const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('login', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        }
    },
    {
        freezeTableName: true
    });
};