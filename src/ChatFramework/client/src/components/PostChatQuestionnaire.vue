<template>
  <form-layout title="Post Chat Questionnaire">
    <div slot="card-text">
      <v-subheader>How much do you agree / disagree with these statements</v-subheader>
      <p class="question-text">The conversation was comfortable and flowed well.</p>
      <v-slider v-model="comfortableConversation" thumb-label :color="trackColors[comfortableConversation+4]" :track-color="trackColors[comfortableConversation+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">There were times when I felt uncomfortable during conversation.</p>
      <v-slider v-model="feltUncomfortable" thumb-label :color="trackColors[feltUncomfortable+4]" :track-color="trackColors[feltUncomfortable+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">My conversational partner understood me very well.</p>
      <v-slider v-model="partnerUnderstood" thumb-label :color="trackColors[partnerUnderstood+4]" :track-color="trackColors[partnerUnderstood+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">I understood my conversational partner very well.</p>
      <v-slider v-model="iUnderstood" thumb-label :color="trackColors[iUnderstood+4]" :track-color="trackColors[iUnderstood+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">The conversational assistance was helpful.</p>
      <v-slider v-model="assistanceHelpful" thumb-label :color="trackColors[assistanceHelpful+4]" :track-color="trackColors[assistanceHelpful+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">The conversational assistance was distracting or annoying.</p>
      <v-slider v-model="assistanceAnnoying" thumb-label :color="trackColors[assistanceAnnoying+4]" :track-color="trackColors[assistanceAnnoying+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">The conversational assistance was able to understand the context and was able to provide accurate suggestions.</p>
      <v-slider v-model="assistanceAccurate" thumb-label :color="trackColors[assistanceAccurate+4]" :track-color="trackColors[assistanceAccurate+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">The conversational assistance will help in creating and maintaining the flow in the conversation.</p>
      <v-slider v-model="assistanceWillHelp" thumb-label :color="trackColors[assistanceWillHelp+4]" :track-color="trackColors[assistanceWillHelp+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">I enjoyed the overall experience.</p>
      <v-slider v-model="iEnjoyed" thumb-label :color="trackColors[iEnjoyed+4]" :track-color="trackColors[iEnjoyed+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <p class="question-text">I would recommend someone to participate in this research study.</p>
      <v-slider v-model="iRecommend" thumb-label :color="trackColors[iRecommend+4]" :track-color="trackColors[iRecommend+4]" min=-4 max=5>
        <template v-slot:append>
          Agree
        </template>
        <template v-slot:prepend>
          Disagree
        </template>
        <template v-slot:thumb-label="{ value }">
          {{ satisfactionEmojis[value+4] }}
        </template>
      </v-slider>
      <v-divider></v-divider>
      <br>
      <v-subheader>Please answer these questions in a couple of lines</v-subheader>
      <p class="question-text">What were the best parts of the conversations?</p>
      <v-textarea outlined v-model="bestParts" placeholder="Please answer in at least two or three lines"></v-textarea>
      <p class="question-text">What aspects of the conversation were uncomfortable or strange?</p>
      <v-textarea outlined v-model="uncomfortableAspects" placeholder="Please answer in at least two or three lines"></v-textarea>
      <p class="question-text">Suggestions to improve the user experience.</p>
      <v-textarea outlined v-model="suggestions" placeholder="Please answer in at least two or three lines"></v-textarea>
    </div>
    <div slot="card-actions-left">
      <v-snackbar v-model="snackbar.show" color="red darken-2" :timeout="5000" absolute bottom left>
        {{ snackbar.message }}
      </v-snackbar>
    </div>
    <div slot="card-actions-right">
      <v-btn large elevation="1" color="primary" @click="submitResponses">
        Submit
      </v-btn>
    </div>
  </form-layout>
</template>

<script>
import FormLayout from '@/components/FormLayout'
export default {
  components: {
    FormLayout
  },
  data () {
    return {
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
      trackColors: ['red darken-4', 'red', 'orange darken-3', 'orange', 'yellow darken-2', 'yellow', 'lime lighten-1', 'light-green lighten-1', 'green', 'green darken-2'],
      comfortableConversation: 0,
      feltUncomfortable: 0,
      partnerUnderstood: 0,
      iUnderstood: 0,
      assistanceHelpful: 0,
      assistanceAnnoying: 0,
      assistanceAccurate: 0,
      assistanceWillHelp: 0,
      iEnjoyed: 0,
      iRecommend: 0,
      bestParts: '',
      uncomfortableAspects: '',
      suggestions: '',
      snackbar: {
        show: false,
        message: null
      }
    }
  },
  methods: {
    async submitResponses () {
      console.log('submitting')
    }
  }
}
</script>

<style scoped>
.v-subheader {
  font-size: large;
  padding-left: 0px;
}
.theme--light.v-subheader {
  color: black !important;
}
.question-text {
  font-size: medium;
  margin-bottom: 0px;
}
.v-input__prepend-outer {
  font-size: smaller;
  margin-top: 7px;
  color: rgba(0,0,0,.6);
}
.v-input__append-outer {
  font-size: smaller;
  margin-top: 7px;
  color: rgba(0,0,0,.6);
}
</style>
