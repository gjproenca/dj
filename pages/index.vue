<template>
  <div>
    <v-container style="height: 100vh" fill-height fluid>
      <v-row class="d-flex justify-center">
        <Login :button-login="login"></Login>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  components: {
    Login,
  },
  methods: {
    // TODO: ? move login prop to component
    login() {
      // TODO: Send login details or register user
      alert('Hello')
    },
  },
}
</script>

<style lang="scss" scoped></style>
