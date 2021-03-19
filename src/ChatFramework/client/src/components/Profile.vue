<template>
  <v-container>
    <h1>{{ firstName }} {{ lastName }}</h1>
    <p>Total conversations: {{ totalConversations }}</p>
    <p>Total different conversation partners: {{ totalPeers }}</p>
    <p>Total messages you sent: {{ totalMessagesSent }}</p>
    <p>Total messages you received: {{ totalMessagesReceived }}</p>
    <p>Times you found AdvisorBot helpful: {{ timesBotHelpful }}</p>
    <p>Times you found AdvisorBot not helpful: {{ timesBotNotHelpful }}</p>
    <p>Times you found conversation satisfactory: {{ countGoodConversations }}</p>
    <p>Times you found conversation unsatisfactory: {{ countBadConversations }}</p>
    <p>Karma: {{ karma }} </p>
    <div>
      <p>Awards:</p>
      <v-chip class="mr-2 mb-2" dark v-for="(item, index) in awards" v-bind:key="index" :color="item[1]">{{ item[0] }}</v-chip>
    </div>

    <p>Karma: ((msg_sent + msg_rec) / (t_conv / conv_partners)) + (bot_help * conv_s) - (bot_n_help * conv_u)</p>
    <p>Awards:SignUp,
              10_50_100_200_500_t_conv,
              3_10_20_50_partners,
              50_100_1000_5000_msg,
              10_50_100_200_bot_help,
              10_50_100_200_bot_n_help,
              10_50_100_200_conv_s,
              10_50_100_200_conv_u  </p>
  </v-container>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      totalConversations: 0,
      totalPeers: 0,
      totalMessagesSent: 0,
      totalMessagesReceived: 0,
      timesBotHelpful: 0,
      timesBotNotHelpful: 0,
      countGoodConversations: 0,
      countBadConversations: 0,
      karma: 0,
      awards: []
    }
  },
  async created () {
    const result = (await ProfileService.getUserProfile(this.$store.state.user.ID)).data
    this.firstName = result.firstName
    this.lastName = result.lastName
    this.totalConversations = result.totalConversations
    this.totalPeers = result.totalPeers
    this.totalMessagesSent = result.totalMessagesSent
    this.totalMessagesReceived = result.totalMessagesReceived
    this.timesBotHelpful = result.timesBotHelpful
    this.timesBotNotHelpful = result.timesBotNotHelpful
    this.countGoodConversations = result.countGoodConversations
    this.countBadConversations = result.countBadConversations
    this.firstName = result.user.FirstName
    this.lastName = result.user.LastName
    this.karma = result.karma
    this.awards = result.awards
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
