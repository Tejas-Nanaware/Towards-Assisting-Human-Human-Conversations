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
    age: Joi.number()
    .integer()
    .min(18)
  })
  const {error, value} = schema.validate({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password
  })

  if (error) {
    console.log(error)
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
      case 'age':
        res.status(400).send({
          error: 'You must be atleast 18 to sign up'
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