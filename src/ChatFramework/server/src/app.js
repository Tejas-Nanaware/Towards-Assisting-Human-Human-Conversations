const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./sequelize')
const config = require('./config/config')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

let users = []

const assertDatabaseConnectionOk = async () => {
    console.log('Checking database connection...')
    try {
        await sequelize.authenticate()
        console.log('Database connection OK!')
    } catch (error) {
        console.log('Unable to connect to the database:')
        console.log(error.message)
        process.exit(1)
    }
}

const init = async () => {
    try {
        await assertDatabaseConnectionOk()
    } catch (error) {
        console.log('Unable to connect')
    }
    console.log(`Starting Sequelize + Express example on port ${config.port}...`)
    http.listen(config.port, () => {
        console.log(`Express server started on port ${config.port}. Try some routes, such as '/api/users'.`)
    })

    io.on('connection', (socket) => {
        // console.log('Socket Connection Established with ID :' + socket.id)
        // Add user to socket
        let isAdded = false
        socket.on('ADD_USER', (userID) => {
            if (!isAdded) {
                users.push({id: socket.id, 
                            userID: userID})
                isAdded = true
            }
        })
        
        // Remove socket connection of the disconnected user
        socket.on('disconnect', () => {
            for (let index = 0; index < users.length; index++) {
                const user = users[index]
                if (user.id === socket.id) {
                    users.splice(index, 1)
                }
            }
        })
    })
}
init();