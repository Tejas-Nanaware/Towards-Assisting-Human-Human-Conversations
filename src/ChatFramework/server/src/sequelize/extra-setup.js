const applyExtraSetup = (sequelize) => {
  const { conversations, users, questionnaires } = sequelize.models
  conversations.hasMany(users)
  questionnaires.belongsTo(conversations)
}

module.exports = { applyExtraSetup }
