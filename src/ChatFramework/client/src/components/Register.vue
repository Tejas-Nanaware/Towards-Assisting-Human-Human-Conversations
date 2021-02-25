<template>
  <div>
    <v-container>
      <p class="mb-0">By registering you provide the consent as per the consent form</p>
    </v-container>
    <form-layout title="Register">
      <div slot="card-text">
        <v-text-field name="firstName" label="First Name" v-model="firstName"></v-text-field>
        <v-text-field name="lastName" label="Last Name" v-model="lastName"></v-text-field>
        <v-text-field name="email" type="email" label="Email" v-model="email"></v-text-field>
        <v-text-field name="password" type="password" label="Password" v-model="password"></v-text-field>
        <v-subheader class="text-center align-center">Please answer these demographic questions</v-subheader>
        <v-divider></v-divider>
        <v-subheader></v-subheader>
        <v-text-field name="age" type="number" label="Age" v-model="age"></v-text-field>
        <v-select name="gender" :items="genderList" label="Gender" v-model="gender"></v-select>
        <v-text-field name="genderText" label="Please type your Gender" v-if="gender === 'A gender identity not listed here. Please specify'" v-model="genderText"></v-text-field>
        <v-select name="race" :items="raceList" label="Race / Ethnicity" v-model="race"></v-select>
        <v-select name="nativeLanguage" :items="nativeLanguageList" label="Native Language" v-model="nativeLanguage"></v-select>
        <v-text-field name="nativeLanguageText" label="Please type your Native Language" v-if="nativeLanguage === 'Other'" v-model="nativeLanguageText"></v-text-field>
        <v-select name="nationality" :items="nationalityList" label="Nationality" v-model="nationality"></v-select>
        <v-select name="education" :items="educationList" label="Education" v-model="education"></v-select>
        <v-select name="fieldOfEducation" :items="fieldOfEducationList" label="Field of Education" v-model="fieldOfEducation"></v-select>
        <v-select name="maritalStatus" :items="maritalStatusList" label="Marital Status" v-model="maritalStatus"></v-select>
        <v-select name="employementStatus" :items="employementStatusList" label="Employement Status" v-model="employementStatus"></v-select>
        <v-select name="workIndustry" :items="workIndustryList" label="Work Industry" v-if="employementStatus === 'Student' || employementStatus === 'Unemployed'" v-model="workIndustry" ></v-select>
        <v-select name="disability" :items="disabilityList" label="Disability" v-model="disability"></v-select>
        <v-text-field name="disabilityText" label="Disability" v-if="disability === 'Yes; Specify if yes'" v-model="disabilityText"></v-text-field>
      </div>
      <div slot="card-actions-right">
        <v-btn large elevation="1" color="primary">
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
import FormLayout from '@/components/FormLayout.vue'
export default {
  components: {
    FormLayout
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      age: '',
      genderList: [],
      gender: '',
      genderText: '',
      raceList: [],
      race: '',
      nativeLanguageList: [],
      nativeLanguage: '',
      nativeLanguageText: '',
      nationalityList: [],
      nationality: '',
      educationList: [],
      education: '',
      fieldOfEducationList: [],
      fieldOfEducation: '',
      maritalStatusList: [],
      maritalStatus: '',
      employementStatusList: [],
      employementStatus: '',
      workIndustryList: [],
      workIndustry: '',
      disabilityList: [],
      disability: '',
      disabilityText: '',
      error: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
