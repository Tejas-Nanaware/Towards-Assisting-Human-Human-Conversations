const { DataTypes } = require('sequelize');
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const ExceptionController = require('../../controllers/ExceptionController')

const hashPassword = async (user) => {
  try {
    console.log("in")
    const SALT_FACTOR = 10
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    const hash = await bcrypt.hash(user.dataValues.Password, salt)
    user.setDataValue('PasswordSalt', salt)
    user.setDataValue('Password', hash)    
  } catch (error) {
    ExceptionController.addError(error.message, 'server.users.model.hashPassword', error, Date.now(), Date.now())
  }
}

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FirstName: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    LastName: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    Password: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    PasswordSalt: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Age: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: false
    },
    GenderSelect: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    GenderText: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Race: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    NativeLanguageSelect: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    NativeLanguageText: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Nationality: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Education: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    FieldOfEducation: {
      allowNull: true,
      type: DataTypes.TEXT,
      unique: false
    },
    MaritalStatus: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    EmployementStatus: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    WorkIndustry: {
      allowNull: true,
      type: DataTypes.TEXT,
      unique: false
    },
    DisabilitySelect: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    DisabilityText: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    Recruited: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    CreatedAt: {
      allowNull: false,
      type: DataTypes.DATE(6),
      unique: false
    },
    UpdatedAt: {
      allowNull: false,
      type: DataTypes.DATE(6),
      unique: false
    },
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  },
  {
    freezeTableName: true
  },
  )
  User.prototype.comparePassword = async (password, user) => {
    try {
      const hash = await bcrypt.hash(password, user.dataValues.PasswordSalt)
      // const result = await bcrypt.compare(hash, user.dataValues.Password)
      // console.log('result', result)
      // return result
      if (hash === user.dataValues.Password) {
        return true
      } else {
        return false
      }      
    } catch (error) {
      ExceptionController.addError(error.message, 'server.users.model.comparePassword', error, Date.now(), Date.now())
    }
  }
  return User
}
