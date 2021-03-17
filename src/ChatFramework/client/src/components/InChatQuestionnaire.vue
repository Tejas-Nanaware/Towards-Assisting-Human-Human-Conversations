<template>
  <div>
    <v-container></v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="550px">
        <v-card>
          <v-card-title>
            <span class="headline">We would like to hear about your experience</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-switch color="success" v-model="usedBot" label="I used the suggestions from the AdvisorBot"></v-switch>
            <v-switch color="success" v-model="botQuality" label="I like the suggestions from the AdvisorBot"></v-switch>
            <v-switch color="success" v-model="conversationQuality" label="I like the quality of this conversation"></v-switch>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit()">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usedBot: false,
      botQuality: false,
      conversationQuality: false,
      dialog: false
    }
  },
  methods: {
    submit () {
      this.dialog = false
      console.log('usedBot', this.usedBot)
      console.log('botQuality', this.botQuality)
      console.log('conversationQuality', this.conversationQuality)
    }
  }
}
</script>

<style scoped>
</style>
