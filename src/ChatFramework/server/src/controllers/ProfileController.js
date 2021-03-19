const sequelize = require('../sequelize')
const { models } = require('../sequelize')
const ExceptionController = require('./ErrorController')

const computeKarma = (totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations) => {
  return Math.round((totalMessagesSent + totalMessagesReceived) / (totalConversations / totalPeers)) + (timesBotHelpful * countGoodConversations) - (timesBotNotHelpful * countBadConversations)
}

const computeAwards = (user, totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations) => {
  let awards = {}
  const colors = ['light-green darken-3', 'teal darken-3', 'purple darken-2', 'pink darken-3', 'amber darken-4']
  let extraAwards = []
  if (user) {
    extraAwards.push(['Sign Up', colors[4]])
  }
  awards['extraAwards'] = extraAwards
  
  let totalConversationAwards = []
  if (totalConversations >= 500) {
    totalConversationAwards.push(['Over 500 Conversations', colors[4]])
  }
  if (totalConversations >=200) {
    totalConversationAwards.push(['Over 200 Conversations', colors[3]])
  }
  if (totalConversations >= 100) {
    totalConversationAwards.push(['Over 100 Conversations', colors[2]])
  }
  if (totalConversations >= 50) {
    totalConversationAwards.push(['Over 50 Conversations', colors[1]])
  }
  if (totalConversations >= 10) {
    totalConversationAwards.push(['Over 10 Conversations', colors[0]])
  }
  awards['totalConversationAwards'] = totalConversationAwards

  let totalPeersAward = []
  if (totalPeers >= 50 ) {
    totalPeersAward.push(['Over 50 Different Partners', colors[4]])
  }
  if (totalPeers >=20) {
    totalPeersAward.push(['Over 20 Different Partners', colors[3]])
  }
  if (totalPeers >=10) {
    totalPeersAward.push(['Over 10 Different Partners', colors[2]])
  }
  if (totalPeers >=3) {
    totalPeersAward.push(['Over 3 Different Partners', colors[1]])
  }
  awards['totalPeersAward'] = totalPeersAward

  let messagesSentAward = []
  if (totalMessagesSent >= 5000) {
    messagesSentAward.push(['Sent Over 5000 Messages', colors[4]])
  }
  if (totalMessagesSent >= 1000) {
    messagesSentAward.push(['Sent Over 1000 Messages', colors[3]])
  }
  if (totalMessagesSent >= 500) {
    messagesSentAward.push(['Sent Over 500 Messages', colors[2]])
  }
  if (totalMessagesSent >= 100) {
    messagesSentAward.push(['Sent Over 100 Messages', colors[1]])
  }
  if (totalMessagesSent >= 50) {
    messagesSentAward.push(['Sent Over 50 Messages', colors[0]])
  }
  awards['messagesSentAward'] = messagesSentAward

  let messagesReceivedAward = []
  if (totalMessagesReceived >= 5000) {
    messagesReceivedAward.push(['Received Over 5000 Messages', colors[4]])
  }
  if (totalMessagesReceived >= 1000) {
    messagesReceivedAward.push(['Received Over 1000 Messages', colors[3]])
  }
  if (totalMessagesReceived >= 500) {
    messagesReceivedAward.push(['Received Over 500 Messages', colors[2]])
  }
  if (totalMessagesReceived >= 100) {
    messagesReceivedAward.push(['Received Over 100 Messages', colors[1]])
  }
  if (totalMessagesReceived >= 50) {
    messagesReceivedAward.push(['Received Over 50 Messages', colors[0]])
  }
  awards['messagesReceivedAward'] = messagesReceivedAward

  let botHelpfulAward = []
  if (timesBotHelpful >= 200) {
    botHelpfulAward.push(['AdvisorBot Helped You Over 200 Times', colors[3]])
  }
  if (timesBotHelpful >= 100) {
    botHelpfulAward.push(['AdvisorBot Helped You Over 100 Times', colors[2]])
  }
  if (timesBotHelpful >= 50) {
    botHelpfulAward.push(['AdvisorBot Helped You Over 50 Times', colors[1]])
  }
  if (timesBotHelpful >= 10) {
    botHelpfulAward.push(['AdvisorBot Helped You Over 10 Times', colors[0]])
  }
  awards['botHelpfulAward'] = botHelpfulAward

  let botNotHelpfulAward = []
  if (timesBotNotHelpful >= 200) {
    botNotHelpfulAward.push(['You Overpowered AdvisorBot Over 200 Times', colors[3]])
  }
  if (timesBotNotHelpful >= 100) {
    botNotHelpfulAward.push(['You Overpowered AdvisorBot Over 100 Times', colors[2]])
  }
  if (timesBotNotHelpful >= 50) {
    botNotHelpfulAward.push(['You Overpowered AdvisorBot Over 50 Times', colors[1]])
  }
  if (timesBotNotHelpful >= 10) {
    botNotHelpfulAward.push(['You Overpowered AdvisorBot Over 10 Times', colors[0]])
  }
  awards['botNotHelpfulAward'] = botNotHelpfulAward

  let goodConversationAward = []
  if (countGoodConversations >= 200) {
    goodConversationAward.push(['Over 200 Good Conversations', colors[3]])
  }
  if (countGoodConversations >= 100) {
    goodConversationAward.push(['Over 100 Good Conversations', colors[2]])
  }
  if (countGoodConversations >= 50) {
    goodConversationAward.push(['Over 50 Good Conversations', colors[1]])
  }
  if (countGoodConversations >= 10) {
    goodConversationAward.push(['Over 10 Good Conversations', colors[0]])
  }
  awards['goodConversationAward'] = goodConversationAward

  let badConversationAward = []
  if (countBadConversations >= 200) {
    badConversationAward.push(['Over 200 Bad Conversations', colors[3]])
  }
  if (countBadConversations >= 100) {
    badConversationAward.push(['Over 100 Bad Conversations', colors[2]])
  }
  if (countBadConversations >= 50) {
    badConversationAward.push(['Over 50 Bad Conversations', colors[1]])
  }
  if (countBadConversations >= 10) {
    badConversationAward.push(['Over 10 Bad Conversations', colors[0]])
  }
  awards['badConversationAward'] = badConversationAward

  return awards
}

const getProfile = (req, res) => {
  // Execute stored procedure to get User's profile
  sequelize
    .query ('CALL getUserProfile (:userID)',
      {replacements: { userID: req.params.userID },
      type : sequelize.QueryTypes.SELECT}
    ).then (result => {
        
        const totalConversations = result[0][0].TotalConversations
        const totalPeers = result[1][0].TotalPeers
        const totalMessagesSent = result[2][0].TotalMessagesSent
        const totalMessagesReceived = result[3][0].TotalMessagesReceived
        const timesBotHelpful = result[4][0].TimesBotHelpful
        const timesBotNotHelpful = result[5][0].TimesBotNotHelpful
        const countGoodConversations = result[6][0].CountGoodConversations
        const countBadConversations = result[7][0].CountBadConversations
        const user = result[8][0]
        const karma = computeKarma(totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations)
        const awards = computeAwards(user, totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations)

        const sendResponse = [[{
          'title': 'Total Conversations',
          'count': totalConversations,
          'awards': awards.totalConversationAwards
        }, {
          'title': 'Total Different Conversation Partners',
          'count': totalPeers,
          'awards': awards.totalPeersAward
        }, {
          'title': 'Total Messages You Sent',
          'count': totalMessagesSent,
          'awards': awards.messagesSentAward
        }, {
          'title': 'Total Messages You Received',
          'count': totalMessagesReceived,
          'awards': awards.messagesReceivedAward
        }, {
          'title': 'Times You Found AdvisorBot Helpful',
          'count': timesBotHelpful,
          'awards': awards.botHelpfulAward
        }, {
          'title': 'Times You Found AdvisorBot Not Helpful',
          'count': timesBotNotHelpful,
          'awards': awards.botNotHelpfulAward
        }, {
          'title': 'Times You Found Conversation Satisfactory',
          'count': countGoodConversations,
          'awards': awards.goodConversationAward
        }, {
          'title': 'Times You Found Conversation Unsatisfactory',
          'count': countBadConversations,
          'awards': awards.badConversationAward
        }], {
          'extraAwards': awards.extraAwards,
          user: user,
          karma: karma
        }]

        res.status(200).send(sendResponse)
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
