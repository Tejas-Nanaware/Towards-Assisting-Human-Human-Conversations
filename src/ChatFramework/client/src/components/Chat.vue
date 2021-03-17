<template>
  <v-container>
    <in-chat-questionnaire></in-chat-questionnaire>
    <div class="before-chat-container">
      <v-btn @click="leaveChat" color="error">Leave Chat</v-btn>
    </div>
    <div class="chat-container">
      <div class="message mb-2" v-for="(item,index) in messages" v-bind:key="index" :class="{own: item.user=='me'}">
        <div class="content pa-2">
          <i>{{item.message}}</i>
        </div>
      </div>
    </div>

    <div class="bot-replies d-flex justify-space-around ma-2">
      <button class="bot-button ma-2 pa-1" elevation="24"
        v-for="(b, i) in bot_messages" v-bind:key="i"
        @click="message=b.reply"
      >
        {{b.reply}}
      </button>
    </div>

    <div>
      <br>
      <v-text-field label="Message" v-model="message">
        <v-btn :disabled="disableSend" slot="append" color="primary" @click="sendMessage">
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
      </v-text-field>
    </div>
  </v-container>
</template>

<script>
import InChatQuestionnaire from '@/components/InChatQuestionnaire'
import Socket from '@/services/Socket'

export default {
  components: {
    InChatQuestionnaire
  },
  data () {
    return {
      message: '',
      messages: [],
      bot_messages: [],
      room: '',
      database: [],
      disableSend: true,
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
    this.partnerLeftRoom()
  },
  beforeDestroy () {
    this.socket.emit('LEAVE_ROOM', this.room)
    // this.socket.disconnect()
  },
  methods: {
    sendMessage () {
      if (this.message.trim()) {
        this.socket.emit('SEND_MESSAGE', {message: this.message, room: this.room, user: this.$store.state.user})
        this.message = ''
        this.bot_messages = []
        if (this.messages.length >= 3) {
          console.log('Message Len > 3')
          this.dialog = true
        }
      }
    },
    startChat () {
      this.socket.on('START_CHAT', (data) => {
        this.room = data.room
        console.log('Room', this.room)
        this.disableSend = false
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
    partnerLeftRoom () {
      this.socket.on('LEFT_ROOM', (data) => {
        console.log(data, 'has left')
        this.disableSend = true
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
    },
    leaveChat () {
      this.$router.push({
        name: 'postChat'
      })
    }
  }
}
</script>

<style scoped>
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 19rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: inset 0px -2px 3px 0px #C8C8C8;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: #90CAF9;
}
.chat-container .content {
  background-color: #A5D6A7;
  border-radius: 10px;
  display:inline-block;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
  max-width: 50%;
  word-wrap: break-word;
  }
@media (max-width: 480px) {
  .chat-container .content{
    max-width: 60%;
  }
}

.bot-button {
  width: fit-content;
  height: fit-content;
  min-width: 36px;
  min-height: 36px;
  border-radius: 4px;
  background-color: #BBDEFB;
  box-shadow: 0px 1px 5px 0px #c8c8c8;
}
.bot-button:first-child {
  margin-left: 0px !important;
}
.bot-button:last-child {
  margin-right: 0px !important;
}
</style>
