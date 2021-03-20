const { models } = require('../sequelize')
const ExceptionController = require('./ErrorController')

const saveQuestionnaireResponses = async (req, res) => {
  try {
    const questionnaireResponse = await models.questionnaires.create({
      ConversationID: req.body.conversationID,
      ComfortableConversation: req.body.comfortableConversation,
      FeltUncomfortable: req.body.feltUncomfortable,
      PartnerUnderstood: req.body.partnerUnderstood,
      IUnderstood: req.body.iUnderstood,
      AssistanceHelpful: req.body.assistanceHelpful,
      AssistanceAnnoying: req.body.assistanceAnnoying,
      AssistanceAccurate: req.body.assistanceAccurate,
      AssistanceWillHelp: req.body.assistanceWillHelp,
      IEnjoyed: req.body.iEnjoyed,
      IRecommend: req.body.iRecommend,
      BestParts: req.body.bestParts,
      UncomfortableAspects: req.body.uncomfortableAspects,
      Suggestions: req.body.suggestions,
      CreatedAt: Date.now(),
      UpdatedAt: Date.now(),
    })
    const questionnaireResponseJSON = questionnaireResponse.toJSON()
    res.send({ questionnaireResponse: questionnaireResponseJSON })
  } catch (error) {
    if (error.errors[0].message === 'questionnaire.ConversationID_UNIQUE must be unique') {
      res.status(400).send({
        error: 'Your response has already been submitted'
      })
    } else {
      res.status(500).send({
        error: 'Error while storing responses ' + error
      })
      ExceptionController.addError(error.message, 'server.QuestionnaireController.saveQuestionnaireResponses', error, Date.now(), Date.now(), models)
    }
  }
}

module.exports = {
  saveQuestionnaireResponses
}
