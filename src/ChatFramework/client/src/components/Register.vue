<template>
  <div>
    <consent-form></consent-form>
    <form-layout title="Register">
      <div slot="card-text">
        <v-text-field name="firstName" label="First Name" v-model="firstName" required :rules="requiredRules"></v-text-field>
        <v-text-field name="lastName" label="Last Name" v-model="lastName" required :rules="requiredRules"></v-text-field>
        <v-text-field name="email" type="email" label="Email" v-model="email" required :rules="requiredRules"></v-text-field>
        <v-text-field name="password" type="password" label="Password" v-model="password" required :rules="requiredRules"></v-text-field>
        <v-subheader class="text-center align-center">Please answer these demographic questions</v-subheader>
        <v-divider></v-divider>
        <v-subheader></v-subheader>
        <v-text-field name="age" type="number" label="Age" v-model="age" required :rules="requiredRules"></v-text-field>
        <v-select name="gender" :items="lists.genderList" label="Gender" v-model="gender" required :rules="requiredRules"></v-select>
        <v-text-field name="genderText" label="Please type your Gender" v-if="gender === 'A gender identity not listed here. Please specify'" v-model="genderText" required :rules="requiredRules"></v-text-field>
        <v-select name="race" :items="lists.raceList" label="Race / Ethnicity" v-model="race" required :rules="requiredRules"></v-select>
        <v-select name="nativeLanguage" :items="lists.nativeLanguageList" label="Native Language" v-model="nativeLanguage" required :rules="requiredRules"></v-select>
        <v-text-field name="nativeLanguageText" label="Please type your Native Language" v-if="nativeLanguage === 'Others – Specify'" v-model="nativeLanguageText" required :rules="requiredRules"></v-text-field>
        <v-autocomplete name="nationality" :items="lists.nationalityList" label="Nationality" v-model="nationality" required :rules="requiredRules"></v-autocomplete>
        <v-select name="education" :items="lists.educationList" label="Level of Education" v-model="education" required :rules="requiredRules"></v-select>
        <v-autocomplete name="fieldOfEducation" :items="lists.fieldOfEducationList" label="Field of Education" v-model="fieldOfEducation" required :rules="requiredRules"></v-autocomplete>
        <v-select name="maritalStatus" :items="lists.maritalStatusList" label="Marital Status" v-model="maritalStatus" required :rules="requiredRules"></v-select>
        <v-select name="employementStatus" :items="lists.employementStatusList" label="Employement Status" v-model="employementStatus" required :rules="requiredRules"></v-select>
        <v-autocomplete name="workIndustry" :items="lists.workIndustryList" label="Work Industry" v-if="employementStatus === 'Employed Full-Time' || employementStatus === 'Employed Part-Time'" v-model="workIndustry" required :rules="requiredRules"></v-autocomplete>
        <v-select name="disability" :items="lists.disabilityList" label="Disability" v-model="disability" required :rules="requiredRules"></v-select>
        <v-text-field name="disabilityText" label="Disability" v-if="disability === 'Yes; Specify if yes'" v-model="disabilityText" required :rules="requiredRules"></v-text-field>
        <v-select name="recruited" :items="lists.recruitedList" label="How were you recruited for this research study?" v-model="recruited" required :rules="requiredRules"></v-select>
      </div>
      <div slot="card-actions-left">
        <v-snackbar v-model="snackbar.show" color="red darken-2" :timeout="5000" absolute bottom left>
          {{ snackbar.message }}
        </v-snackbar>
      </div>
      <div slot="card-actions-right">
        <v-btn large elevation="1" color="primary" @click="register">
          Register
          <v-icon dark right>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
      </div>
    </form-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FormLayout from '@/components/FormLayout'
import ConsentForm from '@/components/ConsentForm'

export default {
  components: {
    FormLayout,
    ConsentForm
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      genderText: '',
      race: '',
      nativeLanguage: '',
      nativeLanguageText: '',
      nationality: '',
      education: '',
      fieldOfEducation: '',
      maritalStatus: '',
      employementStatus: '',
      workIndustry: '',
      disability: '',
      disabilityText: '',
      recruited: '',
      lists: {},
      snackbar: {
        show: false,
        message: null
      },
      requiredRules: [
        v => !!v || 'Required'
      ]
    }
  },
  async created () {
    const result = (await AuthenticationService.getLists()).data
    this.lists = result
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          age: this.age,
          gender: this.gender,
          genderText: this.genderText,
          race: this.race,
          nativeLanguage: this.nativeLanguage,
          nativeLanguageText: this.nativeLanguageText,
          nationality: this.nationality,
          education: this.education,
          fieldOfEducation: this.fieldOfEducation,
          maritalStatus: this.maritalStatus,
          employementStatus: this.employementStatus,
          workIndustry: this.workIndustry,
          disability: this.disability,
          disabilityText: this.disabilityText,
          recruited: this.recruited
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'profile'
        })
      } catch (error) {
        this.snackbar.show = true
        this.snackbar.message = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
