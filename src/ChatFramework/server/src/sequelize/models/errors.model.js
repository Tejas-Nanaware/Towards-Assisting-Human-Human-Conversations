const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('errors', {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Message: {
      allowNull: true,
      type: DataTypes.TEXT,
      unique: false
    },
    Location: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    StackTrace: {
      allowNull: true,
      type: DataTypes.JSON,
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
  })
}
