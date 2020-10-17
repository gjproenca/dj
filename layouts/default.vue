<template>
  <v-app>
    <v-main>
      <v-app-bar v-if="this.$auth.loggedIn" elevation="0">
        <v-spacer />
        <Logout />
      </v-app-bar>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logout from '../components/Logout.vue'

export default {
  components: {
    Logout,
  },
}
</script>

<style lang="scss" scoped></style>
