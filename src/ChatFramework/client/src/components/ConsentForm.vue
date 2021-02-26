<template>
  <div>
    <v-container></v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Do you agree with this and provide your consent?</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <p>You are being asked to participate in a research study. Participation in this research study is voluntary and you may withdraw from the study at any time without penalty. Your identity will be coded to ensure confidentiality.</p>
            <p>The purpose of this study is to understand and assist text-based human conversations by identifying key parameters behind a successful conversation and using chat assistants that can help to maintain the conversational flow. As a participant in this study, you will be signing up on the online platform and will be connected to another participant or a chatbot and asked to have a conversation. You can disconnect at any time and may reconnect to converse with several participants.</p>
            <p>During this experience, you will be asked to complete questionnaires about your perceptions of your conversation and your experience using the platform. Apart from that, at the start, you will be asked to fill a demographic questionnaire.</p>
            <p>While having a conversation, you may be provided with conversational assistance that may suggest possible next sentences or phrases related to the conversation. You can use or modify these suggestions or ignore them if you choose.</p>
            <p>The conversations and the questionnaires will be stored and may be shared with other researchers, but your identity will be coded and kept separate from that data, to ensure your confidentiality. However, you are advised not to have conversations that may reveal your identity.</p>
            <p>Although participation involves no future obligation, you may be contacted for future assessment sessions and may have the opportunity to participate in additional research if you so wish.</p>
            <p><strong>Risks:</strong> The risks that may be caused by this research study are:</p>
            <ol>
            <li>Discomfort with release of confidential information or disability or impairment during conversations.</li>
            <li>Participants may feel inhibited or uncomfortable since the chats are being recorded.</li>
            <li>Participants may feel uncomfortable about answering the questionnaires or due to irrelevant or inappropriate chat suggestions.</li>
            <li>Participants may feel uncomfortable being advised by a bot about what to say in a chat.</li>
            </ol>
            <p>We are committed to respecting your privacy and to keep your personal information confidential.</p>
            <p>Any further questions about the research and your rights as a participant will be answered if you contact the project director (Prof. Shlomo Argamon, Department of Computer Science, <a href="mailto:argamon@iit.edu">argamon@iit.edu</a>). The IIT Counseling Center is available to you, free of charge, to discuss your situation or your feelings. IIT Counseling Center can be contacted at 312-567-7550. For subjects outside the university, you can get free counseling services by dialing 211 in most municipalities, and refer to <a href="https://www.mentalhealth.gov/" target="blank">https://www.mentalhealth.gov/</a> for more resources.</p>
            <p>Illinois Institute of Technology is not responsible for any injuries or medical conditions research participants may suffer during the time of the research study unless those injuries or medical conditions are due to IIT’s negligence. Questions and complaints can be addressed to the Executive Officer of the IRB at 312-567-7141.</p>
            <p><strong>AFFIRMATION OF PARTICIPANT:</strong></p>
            <p>I have read the material above and any questions I asked have been answered to my satisfaction. I agree to participate in this activity, realizing that I may withdraw without penalty at any time.</p>
            <p>Please save or print a copy of this consent form for your records.</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="saveConsentForm">
              Save
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="consentForm(false)">
              Disagree
            </v-btn>
            <v-btn color="green darken-1" text @click="consentForm(true)">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import DownloadsService from '@/services/DownloadsService'
export default {
  data () {
    return {
      dialog: false,
      formResponse: false
    }
  },
  mounted () {
    this.dialog = true
  },
  methods: {
    consentForm (formResponse) {
      this.formResponse = formResponse
      this.dialog = false
      if (!this.formResponse) {
        this.$router.push({
          name: 'root'
        })
      }
    },
    async saveConsentForm () {
      console.log('save')
      await DownloadsService.saveConsentForm()
    }
  }
}
</script>

<style scoped>
.v-card__text {
  text-align: justify;
}
</style>
