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
        PasswordSalt: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: false
        },
        Age: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        GenderSelect: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        GenderText: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        Race: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        NativeLanguageSelect: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        NativeLanguageText: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        Nationality: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        Education: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        FieldOfEducation: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        MaritalStatus: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        EmployementStatus: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        WorkIndustry: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        DisabilitySelect: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        DisabilityText: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: false
        },
        Recruited: {
            allowNull: true,
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