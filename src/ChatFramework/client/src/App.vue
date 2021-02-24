<template>
  <v-app>
    <div id="app">
      <page-header />
      <div id="main">
        <router-view/>
      </div>
    </div>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  components: {
    PageHeader
  },
  name: 'App'
}
</script>

<style>
#main {
  margin-top: 64px;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
