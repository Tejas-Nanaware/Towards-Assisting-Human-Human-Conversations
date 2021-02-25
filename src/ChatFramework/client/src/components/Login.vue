<template>
  <form-layout title="Login">
    <div slot="card-text">
      <v-text-field type="email" label="Email" placeholder="username@example.com" v-model="email">
      </v-text-field>
      <v-text-field type="password" label="Password" placeholder="Password" v-model="password">
      </v-text-field>
    </div>
    <div slot="card-actions-left">
      <v-snackbar v-model="snackbar.show" color="red darken-2" :timeout="5000" absolute bottom left>
        {{ snackbar.message }}
      </v-snackbar>
    </div>
    <div slot="card-actions-right">
      <v-btn large elevation="1" color="primary" @click="login">
        Login
        <v-icon dark right>
          mdi-login-variant
        </v-icon>
      </v-btn>
    </div>
  </form-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import FormLayout from '@/components/FormLayout'
export default {
  components: {
    FormLayout
  },
  data () {
    return {
      email: '',
      password: '',
      snackbar: {
        show: false,
        message: null
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'root'
        })
      } catch (error) {
        console.log(error)
        this.snackbar.show = true
        this.snackbar.message = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
