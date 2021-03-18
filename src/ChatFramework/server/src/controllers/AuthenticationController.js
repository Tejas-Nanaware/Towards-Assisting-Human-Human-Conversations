const { models } = require('../sequelize')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const ExceptionController = require('./ExceptionController')

const jwtSignUser = (user) => {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: config.authentication.jwtExpiresIn
  })
}

const login = async (req, res) => {
  await models.users.findOne({
    where: {
      Email: {
        [Op.eq]: req.body.email
      },
    }
  }).then(user => {
    if (!user) {
      res.status(403).send({
        error: 'User not found'
      })
    }
    
    user.comparePassword(req.body.password, user)
    .then(isPasswordValid => {
      
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'Invalid Password'
        })
      }
      const userJSON = user.toJSON()
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    })
    .catch(err => {
      res.status(500).send({
        error: 'Error while comparing passwords' + err
      })
    })
  }).catch(err => {
    res.status(400).send({
      error: 'Error while logging in' + err
    })
    ExceptionController.addError(err.message, 'server.AuthenticationController.login.comparePassword', err, Date.now(), Date.now())
  })
}

const getLists = async (req, res) => {
  try {
    const result = await models.demographicQuestionnaire.findAll({
      attributes: ['ListName', 'ListValues']
    })
    let lists = {}
    result.forEach(element => {
      let parsedString = element['ListValues'].split('<SEP>')
      lists[element['ListName']] = parsedString
    });
    res.send(lists)
  } catch (err) {
    res.status(500).send({
      error: 'Error occured while retreiving demographic questionnaire' + err
    })
    ExceptionController.addError(err.message, 'server.AuthenticationController.getLists', err, Date.now(), Date.now())
  }
}

const register = async (req, res) => {
  try {
    const user = await models.users.create({
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.email,
      Password: req.body.password,
      Age: req.body.age,
      GenderSelect: req.body.gender,
      GenderText: req.body.genderText,
      Race: req.body.race,
      NativeLanguageSelect: req.body.nativeLanguage,
      NativeLanguageText: req.body.nativeLanguageText,
      Nationality: req.body.nationality,
      Education: req.body.education,
      FieldOfEducation: req.body.fieldOfEducation,
      MaritalStatus: req.body.maritalStatus,
      EmployementStatus: req.body.employementStatus,
      WorkIndustry: req.body.workIndustry,
      DisabilitySelect: req.body.disability,
      DisabilityText: req.body.disabilityText,
      Recruited: req.body.recruited,
      CreatedAt: Date.now(),
      UpdatedAt: Date.now()
    })
    const userJSON = user.toJSON()
    res.send({
      user: userJSON,
      token: jwtSignUser(userJSON)
    })
  } catch (err) {
    if (err.errors[0].message === 'users.Email_UNIQUE must be unique') {
      res.status(400).send({
        error: 'That email address is already registered'
      })
    } else {
      res.status(500).send({
        error: 'Error while registering ' + err
      })
      ExceptionController.addError(err.message, 'server.AuthenticationController.register', err, Date.now(), Date.now(), models)
    }
  }
}

module.exports = {
  login,
  getLists,
  register
}