<template>
  <v-container>
    <div class="before-chat-container d-flex justify-space-between flex-row-reverse">
      <v-btn x-small rounded elevation="0" @click="leaveChat" class="leaveChat" color="error">Leave Chat</v-btn>
      <div v-if="peerUserID === 0"><v-chip class="mb-1" color="blue lighten-4" x-small>Waiting for a partner</v-chip></div>
      <div v-if="peerUserID !== 0 && disableSend"><v-chip class="mb-1" color="error" x-small>Your partner has left</v-chip></div>
    </div>

    <div class="chat-container">
      <div class="message mb-2" v-for="(item,index) in messages" v-bind:key="index" :class="{own: item.senderID === $store.state.user.ID}">
        <div class="content pa-2">
          <i>{{item.message}}</i>
        </div>
      </div>
    </div>

    <div class="bot-replies d-flex justify-space-around change-flex-direction">
      <div class="mt-4" v-if="!botMessages.length">Suggestions will be loaded here when you get new messages</div>
      <button class="bot-button ma-2 pa-1" elevation="24"
        v-for="(b, i) in botMessages" v-bind:key="i"
        @click="botMessageClick(b)"
      >
        {{b.reply}}
      </button>
    </div>

    <div>
      <v-text-field label="Message" v-model="message" v-on:keyup.enter="sendMessage">
        <v-btn :disabled="disableSend" slot="append" color="primary" @click="sendMessage">
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
      </v-text-field>
    </div>

    <div class="d-flex justify-space-around change-flex-direction">
      <div>How's it going?</div>
      <div>
        AdvisorBot:
        <v-btn-toggle rounded dense>
          <v-btn small :color="(advisorStatus.length ? ((advisorStatus[advisorStatus.length-1].Status === 'up') ? 'success' : null) : null)" :disabled="disableAdvisorButtons" @click="advisorClick('up')">
            <v-icon small>mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn small :color="(advisorStatus.length ? ((advisorStatus[advisorStatus.length-1].Status === 'down') ? 'error' : null) : null)" :disabled="disableAdvisorButtons" @click="advisorClick('down')">
            <v-icon small>mdi-thumb-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div>
        Conversation Quality:
        <v-btn-toggle rounded dense>
          <v-btn small :color="(conversationStatus.length ? ((conversationStatus[conversationStatus.length-1].Status === 'up') ? 'success' : null) : null)" :disabled="disableConversationButtons" @click="conversationClick('up')">
            <v-icon small>mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn small :color="(conversationStatus.length ? ((conversationStatus[conversationStatus.length-1].Status === 'down') ? 'error' : null) : null)" :disabled="disableConversationButtons" @click="conversationClick('down')">
            <v-icon small>mdi-thumb-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </v-container>
</template>

<script>
import ChatService from '@/services/ChatService'
import Socket from '@/services/Socket'
import config from '@/config/config'

export default {
  data () {
    return {
      message: '',
      messages: [],
      botMessages: [],
      room: '',
      peerUserID: 0,
      peerSocketID: null,
      nameOfBotClicked: '',
      disableSend: true,
      advisorStatus: [],
      disableAdvisorButtons: false,
      conversationStatus: [],
      disableConversationButtons: false,
      socket: Socket
    }
  },
  created () {
    // Add user to socket
    this.socket.emit('ADD_USER', this.$store.state.user.ID)
    this.startChat()
  },
  mounted () {
    this.newMessage()
    this.partnerLeftRoom()
  },
  beforeDestroy () {
    this.socket.emit('LEAVE_ROOM', this.room)
    this.sendChatData()
    // this.socket.disconnect()
  },
  methods: {
    sendMessage () {
      if (this.message.trim()) {
        this.socket.emit('SEND_MESSAGE', {message: this.message, room: this.room, senderID: this.$store.state.user.ID})
        this.message = ''
        this.botMessages = []
      }
    },
    startChat () {
      this.socket.on('START_CHAT', (data) => {
        this.room = data.room
        this.peerUserID = data.peerUserID
        this.peerSocketID = data.peerSocketID
        this.disableSend = false
      })
    },
    newMessage () {
      this.socket.on('NEW_MESSAGE', (data) => {
        let newMessage = {senderID: data.senderID, message: data.message, botSuggestions: this.botMessages, createdAt: Date.now()}
        if (this.nameOfBotClicked !== '') {
          newMessage['nameOfBot'] = this.nameOfBotClicked
          this.nameOfBotClicked = ''
        }
        this.messages.push(newMessage)
        if (data.senderID === this.$store.state.user.ID) {
          console.log('My message', data.message)
        } else {
          this.getBotMessages(data.message)
          this.disableAdvisorButtons = false
          this.disableConversationButtons = false
        }
        setTimeout(() => {
          const element = document.querySelector('.message:last-child')
          element && element.scrollIntoView({behavior: 'smooth', block: 'end'})
        }, 300)
      })
    },
    partnerLeftRoom () {
      this.socket.on('LEFT_ROOM', (data) => {
        this.disableSend = true
        setTimeout(() => this.leaveChat(), 5000)
      })
    },
    botMessageClick (bot) {
      this.nameOfBotClicked = bot.bot_name
      this.message = bot.reply
    },
    getBotMessages (text) {
      const blenderBotRequest = config.blenderBotURL + text
      const dialoGPTRequest = config.dialoGPTURL + text

      this.getBotResponseAsync(blenderBotRequest).then(data => {
        this.botMessages.push(data)
      })
      this.getBotResponseAsync(dialoGPTRequest).then(data => {
        this.botMessages.push(data)
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
    },
    advisorClick (status) {
      this.advisorStatus.push({Status: status, CreatedAt: Date.now()})
      this.disableAdvisorButtons = true
    },
    conversationClick (status) {
      this.conversationStatus.push({Status: status, CreatedAt: Date.now()})
      this.disableConversationButtons = true
    },
    async sendChatData () {
      try {
        const response = await ChatService.sendChatData({
          userID: this.$store.state.user.ID,
          peerID: this.peerUserID,
          messages: this.messages,
          advisorStatus: this.advisorStatus,
          conversationStatus: this.conversationStatus
        })
        this.$store.dispatch('setConversationID', response.data.conversation.ID)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
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
.leaveChat {
  align-items: right;
}
@media (max-width: 600px) {
  .chat-container .content{
    max-width: 60%;
  }
  .change-flex-direction {
    flex-direction: column;
  }
  .change-flex-direction .bot-button {
    margin-left: 0px !important;
    margin-right: 0px !important;
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
