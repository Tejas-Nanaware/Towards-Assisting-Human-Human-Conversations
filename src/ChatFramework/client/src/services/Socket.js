import io from 'socket.io-client'
import config from '@/config/config'

// const io = require('socket.io-client');
const socket = io(config.socket_server, {
  path: config.socket_path,
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'Illinois Tech'
  }
})

export default socket
