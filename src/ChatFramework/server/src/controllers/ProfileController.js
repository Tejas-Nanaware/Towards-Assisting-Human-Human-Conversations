const sequelize = require('../sequelize')
const { models } = require('../sequelize')
const ExceptionController = require('./ErrorController')

const getProfile = (req, res) => {
  // Execute stored procedure to get User's profile
  sequelize
    .query ('CALL getUserProfile (:userID)',
      {replacements: { userID: req.params.userID },
      type : sequelize.QueryTypes.SELECT}
    ).then (result => {
        console.log(result[8][0].FirstName)
        const TotalConversations = result[0][0].TotalConversations
        const TotalPeers = result[1][0].TotalPeers
        const TotalMessagesSent = result[2][0].TotalMessagesSent
        const TotalMessagesReceived = result[3][0].TotalMessagesReceived
        const TimesBotHelpful = result[4][0].TimesBotHelpful
        const TimesBotNotHelpful = result[5][0].TimesBotNotHelpful
        const CountGoodConversations = result[6][0].CountGoodConversations
        const CountBadConversations = result[7][0].CountBadConversations
        const user = result[8][0]
        res.status(200).send({
          TotalConversations: TotalConversations,
          TotalPeers: TotalPeers,
          TotalMessagesSent: TotalMessagesSent,
          TotalMessagesReceived: TotalMessagesReceived,
          TimesBotHelpful: TimesBotHelpful,
          TimesBotNotHelpful: TimesBotNotHelpful,
          CountGoodConversations: CountGoodConversations,
          CountBadConversations: CountBadConversations,
          User: user
        })
    }).catch (error => {
        res.status(500).send({
          error: 'Error while getting profile' + error
        })
        ExceptionController.addError(error.message, 'server.ProfileController.getProfile', error, Date.now(), Date.now(), models)
    })
}
module.exports = {
  getProfile
}
