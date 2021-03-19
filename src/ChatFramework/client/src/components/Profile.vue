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
    <p>Awards: {{ awards }} </p>

    <p>Karma: ((msg_sent + msg_rec) / (t_conv / conv_partners)) + (bot_help * conv_s) - (bot_n_help * conv_u)</p>
    <p>Awards:SignUp,
              1_5_10_20_50_t_conv,
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
    this.firstName = result.FirstName
    this.lastName = result.LastName
    this.totalConversations = result.TotalConversations
    this.totalPeers = result.TotalPeers
    this.totalMessagesSent = result.TotalMessagesSent
    this.totalMessagesReceived = result.TotalMessagesReceived
    this.timesBotHelpful = result.TimesBotHelpful
    this.timesBotNotHelpful = result.TimesBotNotHelpful
    this.countGoodConversations = result.CountGoodConversations
    this.countBadConversations = result.CountBadConversations
    this.firstName = result.User.FirstName
    this.lastName = result.User.LastName

    this.computeKarma()
    this.computeAwards()
  },
  methods: {
    computeKarma () {
      this.karma = Math.round((this.totalMessagesSent + this.totalMessagesReceived) / (this.totalConversations / this.totalPeers)) + (this.timesBotHelpful * this.countGoodConversations) - (this.timesBotNotHelpful * this.countBadConversations)
    },
    computeAwards () {
      this.awards.push('SignUp')
    }
  }
}
</script>

<style scoped>

</style>
