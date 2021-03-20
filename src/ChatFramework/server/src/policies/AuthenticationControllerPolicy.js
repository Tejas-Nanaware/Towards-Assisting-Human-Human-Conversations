const Joi = require('joi')

const register = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().regex(
      new RegExp('[a-zA-Z]')
    ),
    lastName: Joi.string().regex(
      new RegExp('[a-zA-Z]')
    ),
    email: Joi.string().email(),
    password: Joi.string().regex(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,32}$')
    ),
    age: Joi.number().integer().min(18),
    gender: Joi.string().min(3).required(),
    genderText: Joi.when('gender', {
      is: Joi.string().valid('A gender identity not listed here. Please specify').required(),
      then: Joi.string().min(1).required()
    }),
    race: Joi.string().min(3).required(),
    nativeLanguage: Joi.string().min(3).required(),
    nativeLanguageText: Joi.when('nativeLanguage', {
      is: Joi.string().valid('Others – Specify').required(),
      then: Joi.string().min(1).required()
    }),
    nationality: Joi.string().min(3).required(),
    education: Joi.string().min(3).required(),
    fieldOfEducation: Joi.string().min(3).required(),
    maritalStatus: Joi.string().min(3).required(),
    employementStatus: Joi.string().min(3).required(),
    workIndustry: Joi.when('employementStatus', {
      is: Joi.string().invalid('Student', 'Unemployed').required(),
      then: Joi.string().min(3).required()
    }),
    disability: Joi.string().min(1).required(),
    disabilityText: Joi.when('disability', {
      is: Joi.string().valid('Yes; Specify if yes').required(),
      then: Joi.string().min(1).required()
    }),
    recruited: Joi.string().min(1).required(),
  })
  const {error, value} = schema.validate({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    genderText: req.body.genderText,
    race: req.body.race,
    nativeLanguage: req.body.nativeLanguage,
    nativeLanguageText: req.body.nativeLanguageText,
    nationality: req.body.nationality,
    education: req.body.education,
    fieldOfEducation: req.body.fieldOfEducation,
    maritalStatus: req.body.maritalStatus,
    employementStatus: req.body.employementStatus,
    workIndustry: req.body.workIndustry,
    disability: req.body.disability,
    disabilityText: req.body.disabilityText,
    recruited: req.body.recruited
  })

  if (error) {
    switch (error.details[0].context.key) {
      case 'firstName':
        res.status(400).send({
          error: 'First Name can only contain upper case and lower case alphabets'
        })
        break
      case 'lastName':
        res.status(400).send({
          error: 'Last Name can only contain upper case and lower case alphabets'
        })
        break
      case 'email':
        res.status(400).send({
          error: 'Email address is not valid'
        })
        break
      case 'password':
        res.status(400).send({
          error: 'Password must contain atleast one upper case, one lower case and one special character and must be between 8 to 32 characters in length'
        })
        break
      case 'age':
        res.status(400).send({
          error: 'You must be atleast 18 to sign up'
        })
        break
      case 'gender':
        res.status(400).send({
          error: 'You must specify your Gender'
        })
        break
      case 'genderText':
        res.status(400).send({
          error: 'You must type your Gender if you have selected to specify'
        })
        break
      case 'race':
        res.status(400).send({
          error: 'You must specify your Race'
        })
        break
      case 'nativeLanguage':
        res.status(400).send({
          error: 'You must specify your Native Language'
        })
        break
      case 'nativeLanguageText':
        res.status(400).send({
          error: 'You must type your Native Language if you have selected to specify'
        })
        break
      case 'nationality':
        res.status(400).send({
          error: 'You must specify your Nationality'
        })
        break
      case 'education':
        res.status(400).send({
          error: 'You must specify your Level of Education'
        })
        break
      case 'fieldOfEducation':
        res.status(400).send({
          error: 'You must specify your Field of Education'
        })
        break
      case 'maritalStatus':
        res.status(400).send({
          error: 'You must specify your Marital Status'
        })
        break
      case 'employementStatus':
        res.status(400).send({
          error: 'You must specify your Employement Status'
        })
        break
      case 'workIndustry':
        res.status(400).send({
          error: 'You must specify your Work Industry if you are employed'
        })
        break
      case 'disability':
        res.status(400).send({
          error: 'You must specify if you have any Disability'
        })
        break
      case 'disabilityText':
        res.status(400).send({
          error: 'You must type your Disability if you have selected to specify'
        })
        break
      case 'recruited':
        res.status(400).send({
          error: 'You must specify how you were recruited for this program'
        })
        break
      default:
        res.status(400).send({
          error: 'Error while validating the registration form'
        })
        break
    }
  } else {
    console.log(value)
    next()
  }
}

module.exports = {
  register
}