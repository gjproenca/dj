<template>
  <div>
    <v-container style="height: 100vh" fill-height fluid>
      <v-row class="d-flex justify-center">
        <Login></Login>
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
}
</script>

<style lang="scss" scoped></style>
