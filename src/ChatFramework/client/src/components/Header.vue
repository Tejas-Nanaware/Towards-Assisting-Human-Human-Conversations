<template>
  <v-app-bar fixed dark color="blue darken-2">
      <v-app-bar-title class="pr-4">
        <router-link to="/">Assistive Chats</router-link>
      </v-app-bar-title>
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <v-tab text dark v-if="$store.state.isUserLoggedIn">
          <router-link to="/profile">Profile</router-link>
        </v-tab>
      </div>
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <v-tab text dark v-if="$store.state.isUserLoggedIn">
          <router-link to="/chat">Chat</router-link>
        </v-tab>
      </div>
      <v-spacer></v-spacer>
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <v-tab text dark @click="logout" v-if="$store.state.isUserLoggedIn">
          Logout
        </v-tab>
      </div>
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <v-tab text dark v-if="!$store.state.isUserLoggedIn">
          <router-link to="/login">Login</router-link>
        </v-tab>
      </div>
      <div v-if="!$vuetify.breakpoint.xsOnly">
        <v-tab text dark v-if="!$store.state.isUserLoggedIn">
          <router-link to="/register">Register</router-link>
        </v-tab>
      </div>

      <!-- Responsive design for icons -->
      <v-menu left bottom v-if="$vuetify.breakpoint.xsOnly">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-if="$store.state.isUserLoggedIn">
            <v-list-item-title>
              <router-link to="/profile">Profile</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.isUserLoggedIn">
            <v-list-item-title>
              <router-link to="/chat">Chat</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.isUserLoggedIn" @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.isUserLoggedIn">
            <v-list-item-title>
              <router-link to="/login">Login</router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.isUserLoggedIn">
            <v-list-item-title>
              <router-link to="/register">Register</router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }]
  }),
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
.v-list-item__title a {
  text-decoration: none;
  color: #000 !important;
}
</style>
