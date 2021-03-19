<template>
  <v-container>
    <v-card class="mx-auto" max-width="1200">
      <v-card-title class="deep-purple darken-2">
        <h1 class="title font-weight-medium white--text text-center grow">
          {{firstName}} {{lastName}}
        </h1>
      </v-card-title>
      <v-card-text>
        <h3 class="font-weight-light text-center grow mt-4 mb-8">Thank you for signing up for this research study. Here is a <v-chip dark small color="amber darken-4">Sign Up</v-chip> award for registering with us. You can gain karma by interacting with more users by having conversations and providing feedback. <strong>Your current karma is: {{ karma }}</strong>. Here is your timeline and insights since you signed up.</h3>
        <v-divider></v-divider>
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item small fill-dot v-for="(detail, i) in profileDetails" :key="i" :color="colors[i]">
            <template v-slot:opposite>
              <span :class="`headline font-weight-bold ${colors[i]}--text`" v-text="detail.count"></span>
            </template>
            <div class="py-4">
              <h2 :class="`headline font-weight-light mb-4 ${colors[i]}--text`">
                {{ detail.title }}
              </h2>
              <div>
                <p v-if="!detail.awards.length">You can earn more awards here</p>
                <p v-if="detail.awards.length">Awards: </p>
                <v-chip class="mr-2 mb-2" dark v-for="(item, index) in detail.awards" v-bind:key="index" :color="colors[i]">{{ item[0] }}</v-chip>
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      karma: 0,
      profileDetails: [],
      extraAwards: [],
      colors: ['cyan', 'green', 'pink', 'blue-grey', 'orange', 'indigo', 'light-green', 'brown']
    }
  },
  async created () {
    const result = (await ProfileService.getUserProfile(this.$store.state.user.ID)).data
    this.profileDetails = result[0]
    this.extraAwards = result[1].extraAwards
    this.karma = result[1].karma
    this.firstName = result[1].user.FirstName
    this.lastName = result[1].user.LastName
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
