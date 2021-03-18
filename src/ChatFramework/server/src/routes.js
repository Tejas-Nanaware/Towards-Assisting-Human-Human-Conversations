const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const DownloadsController = require('./controllers/DownloadsController')
const ChatController = require('./controllers/ChatController')
const QuestionnaireController = require('./controllers/QuestionnaireController')
const ExceptionController = require('./controllers/ErrorController')

module.exports = (app) => {
  app.get('/saveConsentForm', DownloadsController.saveConsentForm)
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.get('/register', AuthenticationController.getLists)
  app.post('/login', AuthenticationController.login)
  app.post('/chat', ChatController.sendChatData)
  app.post('/postChat', QuestionnaireController.saveQuestionnaireResponses)
  app.get('/error', ExceptionController.getErrors)
}
