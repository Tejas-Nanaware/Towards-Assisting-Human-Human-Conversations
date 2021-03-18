const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('conversations', {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    PeerID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    Messages: {
      allowNull: true,
      type: DataTypes.JSON,
      unique: false
    },
    AdvisorStatus: {
      allowNull: true,
      type: DataTypes.JSON,
      unique: false
    },
    ConversationStatus: {
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
