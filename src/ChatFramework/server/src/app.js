const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./sequelize')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)



  const assertDatabaseConnectionOk = async () => {
      console.log('Checking database connection...')
      try {
          await sequelize.authenticate()
          console.log('Database connection OK!')
      } catch(error) {
          console.log('Unable to connect to the database:')
          console.log(error.message)
          process.exit(1)
      }
  }
  
  const init = async () => {
      try {
          await assertDatabaseConnectionOk()
      } catch(error) {
          console.log('Unable to connect')
      }
      console.log(`Starting Sequelize + Express example on port ${config.port}...`)
      app.listen(config.port, () => {
          console.log(`Express server started on port ${config.port}. Try some routes, such as '/api/users'.`)
      });
  }
  init();