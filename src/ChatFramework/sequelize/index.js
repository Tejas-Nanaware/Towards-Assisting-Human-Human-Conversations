const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const db_config = require('../config/db.config');

// const sequelize = new Sequelize('mysql://root:$abcd123@127.0.0.1:3306/sample');
const sequelize = new Sequelize(db_config.DATABASE, db_config.USER, db_config.PASSWORD, {
    host: db_config.HOST,
    dialect: db_config.DIALECT,
    pool: {
        max: db_config.pool.max,
        min: db_config.pool.min,
        acquire: db_config.pool.acquire,
        idle: db_config.pool.idle
    },
    define: {
        timestamps: db_config.define.timestamps
    },
    logging: db_config.logging
  });

const modelDefiners = [
	require('./models/login.model'),
	require('./models/message.model'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;