<template>
  <v-container>
    <v-card>
      <v-toolbar flat dark color="blue darken-2">
        <v-toolbar-title class="font-weight-light">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <slot name="card-text">
        </slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <slot name="card-actions-left">
        </slot>
        <v-spacer></v-spacer>
        <slot name="card-actions-right">
        </slot>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style>

</style>
