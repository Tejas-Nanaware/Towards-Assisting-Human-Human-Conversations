const { models } = require('../sequelize')

const addError = async (message, location, stackTrace, createdAt, updatedAt, model = null) => {
  const Errors  = model ? model.errors : models.errors
  try {
    await Errors.create({
      Message: message,
      Location: location,
      StackTrace: stackTrace,
      CreatedAt: createdAt,
      UpdatedAt: updatedAt
    })
  } catch (exception) {
    console.log('Exception in adding error', exception)
  }
}

const getErrors = async (req, res) => {
  try {
    console.log('PLEASE DEMOGRAPHUCS!!', models)
    const result = await models.errors.findAll()
    res.send(result)
  } catch (err) {
    res.status(500).send({
      error: 'Error occured while retreiving errors' + err
    })
  }
}

const postAddError = async (req, res) => {
  const createdAt = Date.now()
  const response = addError(req.message, req.location, req.stackTrace, createdAt, createdAt)
  res.send(response)
}

module.exports = {
  addError,
  postAddError,
  getErrors
}
