<template>
  <v-app>
    <v-main>
      <v-container>
        <Logout />
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
