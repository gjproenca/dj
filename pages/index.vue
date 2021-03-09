<template>
  <div class="wrapper">
    <v-container fill-height fluid>
      <v-row class="d-flex justify-center">
        <v-col sm="8" md="6">
          <SignIn v-if="getShowSignIn" />
          <SignUp v-else />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  components: {
    SignIn,
    SignUp,
  },
  computed: {
    ...mapGetters({ getShowSignIn: 'signInSignUp/getShowSignInState' }),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-image: url('~assets/images/mink-mingle-HRyjETL87Gg-unsplash.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
