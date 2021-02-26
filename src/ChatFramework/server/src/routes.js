const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const DownloadsController = require('./controllers/DownloadsController')

module.exports = (app) => {
  app.get('/saveConsentForm', DownloadsController.saveConsentForm)
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.get('/register', AuthenticationController.getLists)
  app.post('/login', AuthenticationController.login)
}
