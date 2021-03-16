<template>
  <v-container>
    <div id= "chat-window" class="chat-window">
      <div class="chat-msg" v-for="(item, index) in messages" v-bind:key="index">
        <div v-if="item.user=='me'">
          <img src="https://semantic-ui.com/images/avatar2/large/patrick.png" class="left"  alt="Avatar" style="width:100%;"/>
          <div class="leftmsg">
              <i>You(yeheww)</i>:&nbsp;{{item.message}}
          </div>
        </div>
        <div v-else>
          <img src="https://semantic-ui.com/images/avatar2/small/elyse.png" class="right"  alt="Avatar" style="width:100%;"/>
          <div class="rightmsg">
              <i>Sender</i>:&nbsp;{{item.message}}
          </div>
        </div>
      </div>
      <div id="last-msg"/>
    </div>
    <div style="display: flex; flex-direction: column; margin-top: 1em;">
      <button
        style="width: fit-content; height: fit-content; margin-top: 1em;"
        v-for="(b, i) in bot_messages" v-bind:key="i"
        @click="message=b.reply">
          {{b.reply}}
      </button>
    </div>

    <div>
      <br>
      <v-text-field label="Message" v-model="message">
        <v-btn slot="append" elevation="1" color="primary" @click="sendMessage">
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
      </v-text-field>
    </div>
  </v-container>
</template>

<script>
import Socket from '@/services/Socket'

export default {
  data () {
    return {
      message: '',
      messages: [],
      bot_messages: [],
      room: '',
      // connected: false,
      socket: Socket
    }
  },
  created () {
    // Add user to socket
    this.socket.emit('ADD_USER', this.$store.state.user)
    console.log('Socket ID: ', this.socket.id)
    this.startChat()
  },
  mounted () {
    this.newMessage()
  },
  methods: {
    sendMessage () {
      if (this.message.trim()) {
        this.socket.emit('SEND_MESSAGE', {message: this.message, room: this.room, user: this.$store.state.user})
        this.message = ''
        this.bot_messages = []
      }
    },
    startChat () {
      this.socket.on('START_CHAT', (data) => {
        this.room = data.room
        console.log('Room', this.room)
      })
    },
    newMessage () {
      this.socket.on('NEW_MESSAGE', (data) => {
        if (data.user.ID === this.$store.state.user.ID) {
          console.log('My message', data.message)
          const newMessage = {user: 'me', message: data.message}
          this.messages.push(newMessage)
        } else {
          console.log('Senders message', data.message)
          const newMessage = {user: 'sender', message: data.message}
          this.messages.push(newMessage)
          this.getBotMessages(data.message)
        }
        console.log('New message', data)
      })
    },
    getBotMessages (text) {
      const blenderBotURL = 'http://127.0.0.1:5000/api/v1/Blenderbot?text='
      const dialoGPTURL = 'http://127.0.0.1:5000/api/v1/DialoGPT?text='

      const blenderBotRequest = blenderBotURL + text
      const dialoGPTRequest = dialoGPTURL + text

      this.getBotResponseAsync(blenderBotRequest).then(data => {
        this.bot_messages.push(data)
      })
      this.getBotResponseAsync(dialoGPTRequest).then(data => {
        this.bot_messages.push(data)
      })
    },
    async getBotResponseAsync (url) {
      let response = await fetch(url)
      let data = await response.json()
      return data
    }
  }
}
</script>

<style scoped>
.home{
    display: flex;
}
#online{
    margin-right: 10px;
}
.chat-input{
    margin-top: 20px;
}

 input{
    outline: none;
    border: 1px solid grey;
    height: 35px;
    padding-left: 10px;
}

button{
    margin-left: 10px;
    height: 35px;
    background-color: cadetblue;
    box-shadow: none;
    border: 1px solid grey;
}

.chat-window{
    padding-top:30px;
    padding-bottom: 5px;
    padding-left: 20px;
    padding-right: 20px;
    height: 430px;
    width: 800px;
    overflow-y: auto;
    border: 1px solid grey;;
}

.chat-msg{
    width: 100%;
    display: inline-block;
    margin-top: 5px;
}

.chat-msg img.left {
  float: left;
  max-width: 30px;
  margin-right: 20px;
  border-radius: 50%;
}

.chat-msg img.right {
  float: right;
  max-width: 30px;
  margin-left: 20px;
  border-radius: 50%;
}

.chat-msg .leftmsg {
  float: left;
  border-radius: 6px;
  background-color: purple;
  width: 400px;
  min-height: 40px;
  padding: 10px;
  color:white;
  word-break: break-word;
  opacity: 0.8;
}

.chat-msg .rightmsg {
  float: right;
  border-radius: 6px;
  background-color: #6610f2;
  width: 400px;
  min-height: 40px;
  padding: 10px;
  color:white;
  word-break: break-word;
  opacity: 0.8;
}

#last-msg{
    height: 40px;
}
/* private chat css*/
.open-button {
  background-color:purple;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 0px;
  right: 28px;
  width: 300px;
  padding-top: 10px;
  padding-bottom: 20px;
}

.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 1px solid grey;
  z-index: 9;
}

.form-container {
  width: 300px;
  padding: 10px;
  background-color: white;
}

.form-container .textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  height:200px;
  overflow-y: auto;
}

.form-container .btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
  margin-left: 0px;
}

.form-container .cancel {
  background-color: red;
}

.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

.online-dot {
  height: 15px;
  width: 15px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  margin-right:5px;
  opacity: 0.8;
}

.group-chat-header{
    padding: 8px;
    background-color: purple;
    color: white;
    font-weight: 500;
    opacity: 0.8;
}
</style>
