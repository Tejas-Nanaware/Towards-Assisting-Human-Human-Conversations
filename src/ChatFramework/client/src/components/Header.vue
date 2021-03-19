<template>
  <v-app-bar fixed dark color="blue darken-2">
      <v-app-bar-title class="pr-4">
        <router-link to="/">Assistive Chats</router-link>
      </v-app-bar-title>
      <v-tab text dark v-if="$store.state.isUserLoggedIn">
        <router-link to="/profile">Profile</router-link>
      </v-tab>
      <v-tab text dark v-if="$store.state.isUserLoggedIn">
        <router-link to="/chat">Chat</router-link>
      </v-tab>
      <v-spacer></v-spacer>
      <v-tab text dark @click="logout" v-if="$store.state.isUserLoggedIn">
        Logout
      </v-tab>
      <v-tab text dark v-if="!$store.state.isUserLoggedIn">
        <router-link to="/login">Login</router-link>
      </v-tab>
      <v-tab text dark v-if="!$store.state.isUserLoggedIn">
        <router-link to="/register">Register</router-link>
      </v-tab>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      if (this.$router.history.current.name !== 'root') {
        this.$router.push({
          name: 'root'
        })
      }
    }
  }
}
</script>

<style>
.v-app-bar-title__content {
  width: fit-content !important;
}
.v-app-bar-title a {
  text-decoration: none;
  color: #fff !important;
}
.v-tab a {
  text-decoration: none;
  color: #fff !important;
}
</style>
