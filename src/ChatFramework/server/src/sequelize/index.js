const Sequelize = require('sequelize')
// const { applyExtraSetup } = require('./extra-setup')
const config = require('../config/config')
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options)

const modelDefiners = []

fs
  .readdirSync(path.join(__dirname, 'models'))
  // .filter((file) => 
  //   file !== 'index.js'
  // )
  .forEach((file) => {
    let filePath = path.join(__dirname,'models',file)
    modelDefiners.push(require(filePath))
  })

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize)

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
