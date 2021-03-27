<template>
  <v-container>
    <h1 class="text-xs-h6 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 font-weight-light mt-2">Welcome to Assistive Chats</h1>
    <h6 class="text-subtitle-1 mt-6 mb-4 font-weight-light">Here you'll be able to chat with someone while being assisted through suggestions by an AdvisorBot.</h6>
    <div class="quick-buttons">
      <v-btn small rounded elevation="0" class="mr-2" @click="navigateTo({name: 'login'})" color="blue lighten-2">
        Login
        <v-icon small right>
          mdi-login-variant
        </v-icon>
      </v-btn>
      <v-btn small rounded elevation="0" class="mr-2" @click="navigateTo({name: 'register'})" color="orange lighten-1">
        Register
        <v-icon small right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn small rounded elevation="0" class="mr-2" v-bind="attrs" v-on="on" color="green">
            Share
            <v-icon small right>
              mdi-share-variant
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-card-text class="share-dialog pt-8 pb-0 text-center">
              <ShareNetwork
                v-for="network in networks"
                :network="network.network"
                :key="network.network"
                :style="{backgroundColor: network.color}"
                :url="sharing.url"
                :title="sharing.title"
                :description="sharing.description"
              >
                <v-btn small rounded dark elevation="0" class="mr-2 mb-2" :color="network.color">
                  <v-icon small class="pr-1">{{ network.icon }}</v-icon>
                  {{ network.name }}
                </v-btn>
                <!-- <i :class="network.icon"></i> -->
              </ShareNetwork>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn small text @click="dialog.value = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div class="text-justify body-1">
      <p>The AdvisorBot provides you with the suggestions to what you can say next that is related to the conversation that you are having. You can choose to use / edit / ignore the suggestions provided to you by the AdvisorBot.</p>
      <p>This is a part of a research study to understand and assist textual human conversations by identifying key parameters behind a successful conversation and using chat assistants that can help to maintain the conversational flow.</p>
      <p>As a participant, you will be connected with another participant or a chatbot and asked to have a conversation. You can disconnect at any time and may reconnect to converse with several participants. After the chat, you will be asked with a questionnaire about your experience and perceptions of the conversation.</p>
      <p>We encourage you to have many conversations and refer and invite your friends if you find this experience amusing. This would also help you gain karma and awards in this platform. Hint: One of the trophies is with how many different people you have had conversations with.</p>
      <p>We hope you enjoy this participation and we appreciate your help.</p>
    </div>
    <div class="mt-8 body-2">
      <p class="mb-4">If you encounter any issues or need any information, you can contact me.</p>
      <p class="mb-0 font-weight-light">Tejas Nanaware</p>
      <p class="mb-0 font-weight-light">Department of Computer Science</p>
      <p class="mb-0 font-weight-light">Illinois Institute of Technology</p>
      <p class="mb-0 font-weight-light"><a href="mailto:tnanaware@hawk.iit.edu">tnanaware@hawk.iit.edu</a></p>
    </div>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://bit.ly/3u6gJ7r',
        title: 'Assistive Chats - get guided in any conversation',
        description: 'Join Assistive Chats to chat with a stranger while being helped with the AdvisorBot that can help you overcome social anxiety and get suggestions on loads of topics. Since this is a research project, please help us improve the AdvisorBot by providing us with feedback.'
      },
      networks: [
        { network: 'baidu', name: 'Baidu', icon: 'mdi-paw', color: '#2529d8' },
        { network: 'buffer', name: 'Buffer', icon: 'mdi-buffer', color: '#323b43' },
        { network: 'email', name: 'Email', icon: 'mdi-email', color: '#333333' },
        { network: 'evernote', name: 'Evernote', icon: 'mdi-evernote', color: '#2dbe60' },
        { network: 'facebook', name: 'Facebook', icon: 'mdi-facebook', color: '#1877f2' },
        { network: 'flipboard', name: 'Flipboard', icon: 'mdi-flipboard', color: '#e12828' },
        { network: 'hackernews', name: 'HackerNews', icon: 'mdi-alpha-y-box-outline', color: '#ff4000' },
        { network: 'instapaper', name: 'Instapaper', icon: 'mdi-alpha-i', color: '#428bca' },
        { network: 'line', name: 'Line', icon: 'mdi-chat-outline', color: '#00c300' },
        { network: 'linkedin', name: 'LinkedIn', icon: 'mdi-linkedin', color: '#007bb5' },
        { network: 'messenger', name: 'Messenger', icon: 'mdi-facebook-messenger', color: '#0084ff' },
        { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'mdi-odnoklassniki', color: '#ed812b' },
        { network: 'pinterest', name: 'Pinterest', icon: 'mdi-pinterest', color: '#bd081c' },
        { network: 'pocket', name: 'Pocket', icon: 'mdi-chevron-down', color: '#ef4056' },
        { network: 'quora', name: 'Quora', icon: 'mdi-quora', color: '#a82400' },
        { network: 'reddit', name: 'Reddit', icon: 'mdi-reddit', color: '#ff4500' },
        { network: 'skype', name: 'Skype', icon: 'mdi-skype', color: '#00aff0' },
        { network: 'sms', name: 'SMS', icon: 'mdi-message-processing', color: '#333333' },
        { network: 'stumbleupon', name: 'StumbleUpon', icon: 'mdi-stumbleupon', color: '#eb4924' },
        { network: 'telegram', name: 'Telegram', icon: 'mdi-send', color: '#0088cc' },
        { network: 'tumblr', name: 'Tumblr', icon: 'mdi-tumblr', color: '#35465c' },
        { network: 'twitter', name: 'Twitter', icon: 'mdi-twitter', color: '#1da1f2' },
        { network: 'viber', name: 'Viber', icon: 'mdi-phone-in-talk', color: '#59267c' },
        { network: 'vk', name: 'Vk', icon: 'mdi-vk', color: '#4a76a8' },
        { network: 'weibo', name: 'Weibo', icon: 'mdi-sina-weibo', color: '#e9152d' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'mdi-whatsapp', color: '#25d366' },
        { network: 'wordpress', name: 'Wordpress', icon: 'mdi-wordpress', color: '#21759b' },
        { network: 'xing', name: 'Xing', icon: 'mdi-xing', color: '#026466' },
        { network: 'yammer', name: 'Yammer', icon: 'mdi-yammer', color: '#0072c6' }
      ]
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
.share-dialog a {
  background: none !important;
  text-decoration: none !important;
}
</style>
