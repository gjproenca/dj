<template>
  <v-app>
    <v-main>
      <v-app-bar v-if="this.$auth.loggedIn">
        <n-link
          v-if="this.$route.path !== '/home'"
          to="/home"
          style="text-decoration: none"
        >
          <v-btn color="secondary">Home</v-btn>
        </n-link>
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
