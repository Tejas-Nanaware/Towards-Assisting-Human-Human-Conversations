module.exports = {
  port: process.env.port || 3000,
  host: process.env.host || '192.168.0.100',
  db: {
    database: process.env.DB_NAME || 'database',
    user: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    options: {
      dialect: process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || 'host',
      // logging: function (str) {
      //   console.log(str)
      // },
      logging: false,
      define: {
        timestamps: false
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  },
  authentication: {
    jwtSecret: process.env.DB_HOST || 'nothing',
    jwtExpiresIn: process.env.DB_HOST || 60 * 60
  },
  cors_origins: process.env.cors_origins || ['http://localhost:8080', 'http://localhost:5000', 'http://192.168.0.100:5000']
}