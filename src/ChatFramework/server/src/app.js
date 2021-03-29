const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./sequelize')
const config = require('./config/config')
const ExceptionController = require('./controllers/ErrorController')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  cors: {
    origin: config.cors_origins,
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
let queue = []

const pairUsers = (data) => {
  if (queue.length > 0) {
    let peer = queue.pop()
    if (peer.socket.id === data.socket.id) {
      queue.push(data)
    } else {
      // console.log(peer.id + ' was popped from queue')
      // console.log('Queue', queue)
      let room = data.socket.id + '#' + peer.socket.id
      console.log('Picked peer', peer.socket.id)
      peer.socket.join(room)
      data.socket.join(room)
      console.log(data.socket.id + ' and ' + peer.socket.id + ' joined room ' + room)
      peer.socket.emit('START_CHAT', { 'peerSocketID': data.socket.id, 'room': room, 'peerUserID': data.userID })
      data.socket.emit('START_CHAT', { 'peerSocketID': peer.socket.id, 'room': room, 'peerUserID': peer.userID })
    }
  } else {
    queue.push(data)
    console.log(data.socket.id + ' was pushed to queue')
    // console.log('Queue', queue)
  }
}

const assertDatabaseConnectionOk = async () => {
  console.log('Checking database connection...')
  try {
    await sequelize.authenticate()
    console.log('Database connection OK!')
  } catch (error) {
    console.log('Unable to connect to the database:')
    console.log(error.message)
    ExceptionController.addError(error.message, 'server.app.assertDatabaseConnectionOk', error, Date.now(), Date.now())
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
  http.listen(config.port, config.host, () => {
    console.log(`Express server started on ${config.host} port ${config.port}. Try some routes, such as '/api/users'.`)
  })

  io.on('connection', (socket) => {
    // console.log('Socket Connection Established with ID :' + socket.id)
    // Add user to socket
    let isAdded = false
    socket.on('ADD_USER', (userID) => {
      try {
        if (!isAdded) {
          users.push({
            socketID: socket.id,
            userID: userID
          })
          isAdded = true
        }
        pairUsers({
          socket: socket,
          userID: userID
        })
      } catch (error) {
        ExceptionController.addError(error.message, 'server.app.socket.ADD_USER', error, Date.now(), Date.now())
      }
    })

    socket.on('SEND_MESSAGE', (data) => {
      try {
        io.sockets.in(data.room).emit('NEW_MESSAGE', data)        
      } catch (error) {
        ExceptionController.addError(error.message, 'server.app.socket.SEND_MESSAGE', error, Date.now(), Date.now())
      }
    })

    socket.on('LEAVE_ROOM', (roomName) => {
      try {
        socket.leave(roomName)
        console.log(socket.id, 'leaves', roomName)
        io.sockets.in(roomName).emit('LEFT_ROOM', socket.id)        
      } catch (error) {
        ExceptionController.addError(error.message, 'server.app.socket.LEAVE_ROOM', error, Date.now(), Date.now())
      }
    })

    // Remove socket connection of the disconnected user
    socket.on('disconnect', () => {
      try {
        for (let index = 0; index < users.length; index++) {
          const user = users[index]
          if (user.id === socket.id) {
            users.splice(index, 1)
          }
        }
        for (let index = 0; index < queue.length; index++) {
          const user = queue[index]
          if (user.socket.id === socket.id) {
            queue.splice(index, 1)
          }
        }
        socket.disconnect(true)
      } catch (error) {
        ExceptionController.addError(error.message, 'server.app.socket.disconnect', error, Date.now(), Date.now())
      }
    })
  })
}

init()
