<template>
  <v-app>
    <v-app-bar v-if="$nuxt.$route.path !== '/'" app>
      <ButtonHome />
      <v-spacer></v-spacer>
      <ButtonSignOut />
    </v-app-bar>

    <v-main>
      <nuxt />
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
import ButtonSignOut from '@/components/buttons/ButtonSignOut.vue'

export default {
  components: {
    ButtonHome,
    ButtonSignOut,
  },
}
</script>
