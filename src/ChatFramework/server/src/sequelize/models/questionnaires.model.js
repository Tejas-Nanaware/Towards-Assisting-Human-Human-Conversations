const { DataTypes } = require('sequelize')
// const { conversations } = require('./conversations.model')

module.exports = (sequelize) => {
  sequelize.define('questionnaires', {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ConversationID: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'conversations',
        key: 'ID'
      }
    },
    ComfortableConversation: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    FeltUncomfortable: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    PartnerUnderstood: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    IUnderstood: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    AssistanceHelpful: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    AssistanceAnnoying: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    AssistanceAccurate: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    AssistanceWillHelp: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    IEnjoyed: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    IRecommend: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    BestParts: {
      allowNull: true,
      type: DataTypes.TEXT,
      unique: false
    },
    UncomfortableAspects: {
      allowNull: true,
      type: DataTypes.TEXT,
      unique: false
    },
    Suggestions: {
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
  })
}
