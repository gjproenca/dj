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

  beforeMount() {
    this.loggedIn = this.$auth.loggedIn
  },
}
</script>
