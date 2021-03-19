const sequelize = require('../sequelize')
const { models } = require('../sequelize')
const ExceptionController = require('./ErrorController')

const computeKarma = (totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations) => {
  return Math.round((totalMessagesSent + totalMessagesReceived) / (totalConversations / totalPeers)) + (timesBotHelpful * countGoodConversations) - (timesBotNotHelpful * countBadConversations)
}

const computeAwards = (user, totalConversations, totalPeers, totalMessagesSent, totalMessagesReceived, timesBotHelpful, timesBotNotHelpful, countGoodConversations, countBadConversations) => {
  let awards = []
  const colors = ['light-green darken-3', 'teal darken-3', 'purple darken-2', 'pink darken-3', 'amber darken-4']
  if (user) {
    awards.push(['Sign Up', colors[4]])
  }
  
  if (totalConversations >= 500) {
    awards.push(['Over 500 Conversations', colors[4]])
  }
  if (totalConversations >=200 && totalConversations < 500) {
    awards.push(['Over 200 Conversations', colors[3]])
  }
  if (totalConversations >= 100 && totalConversations < 200) {
    awards.push(['Over 100 Conversations', colors[2]])
  }
  if (totalConversations >= 50 && totalConversations < 100) {
    awards.push(['Over 50 Conversations', colors[1]])
  }
  if (totalConversations >= 10 && totalConversations < 50) {
    awards.push(['Over 10 Conversations', colors[0]])
  }

  if (totalPeers >= 50 ) {
    awards.push(['Over 50 Different Partners', colors[4]])
  }
  if (totalPeers >=20 && totalPeers < 50) {
    awards.push(['Over 20 Different Partners', colors[3]])
  }
  if (totalPeers >=10 && totalPeers < 20) {
    awards.push(['Over 10 Different Partners', colors[2]])
  }
  if (totalPeers >=3 && totalPeers < 10) {
    awards.push(['Over 3 Different Partners', colors[1]])
  }

  if (totalMessagesSent >= 5000) {
    awards.push(['Sent Over 5000 Messages', colors[4]])
  }
  if (totalMessagesSent >= 1000 && totalMessagesSent < 5000) {
    awards.push(['Sent Over 1000 Messages', colors[3]])
  }
  if (totalMessagesSent >= 500 && totalMessagesSent < 1000) {
    awards.push(['Sent Over 500 Messages', colors[2]])
  }
  if (totalMessagesSent >= 100 && totalMessagesSent < 500) {
    awards.push(['Sent Over 100 Messages', colors[1]])
  }
  if (totalMessagesSent >= 50 && totalMessagesSent < 100) {
    awards.push(['Sent Over 50 Messages', colors[0]])
  }

  if (totalMessagesReceived >= 5000) {
    awards.push(['Received Over 5000 Messages', colors[4]])
  }
  if (totalMessagesReceived >= 1000 && totalMessagesReceived < 5000) {
    awards.push(['Received Over 1000 Messages', colors[3]])
  }
  if (totalMessagesReceived >= 500 && totalMessagesReceived < 1000) {
    awards.push(['Received Over 500 Messages', colors[2]])
  }
  if (totalMessagesReceived >= 100 && totalMessagesReceived < 500) {
    awards.push(['Received Over 100 Messages', colors[1]])
  }
  if (totalMessagesReceived >= 50 && totalMessagesReceived < 100) {
    awards.push(['Received Over 50 Messages', colors[0]])
  }

  if (timesBotHelpful >= 200) {
    awards.push(['AdvisorBot Helped You Over 200 Times', colors[3]])
  }
  if (timesBotHelpful >= 100 && timesBotHelpful < 200) {
    awards.push(['AdvisorBot Helped You Over 100 Times', colors[2]])
  }
  if (timesBotHelpful >= 50 && timesBotHelpful < 100) {
    awards.push(['AdvisorBot Helped You Over 50 Times', colors[1]])
  }
  if (timesBotHelpful >= 10 && timesBotHelpful < 50) {
    awards.push(['AdvisorBot Helped You Over 10 Times', colors[0]])
  }

  if (timesBotNotHelpful >= 200) {
    awards.push(['You Overpowered AdvisorBot Over 200 Times', colors[3]])
  }
  if (timesBotNotHelpful >= 100 && timesBotNotHelpful < 200) {
    awards.push(['You Overpowered AdvisorBot Over 100 Times', colors[2]])
  }
  if (timesBotNotHelpful >= 50 && timesBotNotHelpful < 100) {
    awards.push(['You Overpowered AdvisorBot Over 50 Times', colors[1]])
  }
  if (timesBotNotHelpful >= 10 && timesBotNotHelpful < 50) {
    awards.push(['You Overpowered AdvisorBot Over 10 Times', colors[0]])
  }

  if (countGoodConversations >= 200) {
    awards.push(['Over 200 Good Conversations', colors[3]])
  }
  if (countGoodConversations >= 100 && countGoodConversations < 200) {
    awards.push(['Over 100 Good Conversations', colors[2]])
  }
  if (countGoodConversations >= 50 && countGoodConversations < 100) {
    awards.push(['Over 50 Good Conversations', colors[1]])
  }
  if (countGoodConversations >= 10 && countGoodConversations < 50) {
    awards.push(['Over 10 Good Conversations', colors[0]])
  }

  if (countBadConversations >= 200) {
    awards.push(['Over 200 Bad Conversations', colors[3]])
  }
  if (countBadConversations >= 100 && countBadConversations < 200) {
    awards.push(['Over 100 Bad Conversations', colors[2]])
  }
  if (countBadConversations >= 50 && countBadConversations < 100) {
    awards.push(['Over 50 Bad Conversations', colors[1]])
  }
  if (countBadConversations >= 10 && countBadConversations < 50) {
    awards.push(['Over 10 Bad Conversations', colors[0]])
  }

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

        res.status(200).send({
          totalConversations: totalConversations,
          totalPeers: totalPeers,
          totalMessagesSent: totalMessagesSent,
          totalMessagesReceived: totalMessagesReceived,
          timesBotHelpful: timesBotHelpful,
          timesBotNotHelpful: timesBotNotHelpful,
          countGoodConversations: countGoodConversations,
          countBadConversations: countBadConversations,
          user: user,
          karma: karma,
          awards: awards
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
