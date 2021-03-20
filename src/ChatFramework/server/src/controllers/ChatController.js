const { models } = require('../sequelize')
const ExceptionController = require('./ErrorController')

const sendChatData = async (req, res) => {
  try {
    const conversation = await models.conversations.create({
      UserID: req.body.userID,
      PeerID: req.body.peerID,
      Messages: req.body.messages,
      AdvisorStatus: req.body.advisorStatus,
      ConversationStatus: req.body.conversationStatus,
      CreatedAt: Date.now(),
      UpdatedAt: Date.now(),
    })
    const conversationJSON = conversation.toJSON()
    res.send({ conversation: conversationJSON })
  } catch (error) {
    res.status(500).send({
      error: 'Error while storing conversations ' + error
    })
    ExceptionController.addError(error.message, 'server.ChatController.sendChatData', error, Date.now(), Date.now(), models)
  }  
}

module.exports = {
  sendChatData
}
