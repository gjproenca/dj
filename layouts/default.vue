<template>
  <v-app>
    <v-app-bar v-if="loggedIn" app>
      <div v-for="(button, index) in buttons" :key="index">
        <component :is="button"></component>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <v-row>
        <v-col cols="12" align="center" justify="center">
          <span>Copyright &copy; GProenca {{ new Date().getFullYear() }} </span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import ButtonHome from '@/components/buttons/ButtonHome.vue'
import ButtonLogout from '@/components/buttons/ButtonLogout.vue'

export default {
  components: {
    ButtonHome,
    ButtonLogout,
  },
  data() {
    return {
      loggedIn: false,
      buttons: [ButtonHome, ButtonLogout],
    }
  },

  created() {
    if (!process.env.TEST) {
      // Initialize loggedIn to false then either assign it
      // a value in created for running the website or
      // assign it a value in beforeMount for the test environment
      // Note: mounted() works for both but loads slowly while running live
      // Note: can only run one command at a single time ex: npm run dev or npm run test
      this.loggedIn = this.$auth.loggedIn
    }
  },

  beforeMount() {
    // Initialize loggedIn to false then either assign it
    // a value in created for running the website or
    // assign it a value in beforeMount for the test environment
    // Note: mounted() works for both but loads slowly while running live
    // Note: can only run one command at a single time ex: npm run dev or npm run test
    if (process.env.TEST) {
      this.loggedIn = this.$auth.loggedIn
    }
  },
}
</script>
