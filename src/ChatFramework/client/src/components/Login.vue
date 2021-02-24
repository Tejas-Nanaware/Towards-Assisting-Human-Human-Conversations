<template>
  <form-layout title="Login">
    <div slot="card-text">
      <v-text-field type="email" label="Email" placeholder="username@example.com" v-model="email">
      </v-text-field>
      <v-text-field type="password" label="Password" placeholder="Password" v-model="password">
      </v-text-field>
    </div>
    <div slot="card-actions-right">
      <v-btn large elevation="1" color="primary">
        Login
        <v-icon dark right>
          mdi-login-variant
        </v-icon>
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
      email: '',
      password: '',
      error: null
    }
  }
}
</script>

<style scoped>

</style>
