<template>
  <div class="wrapper" app>
    <v-container fill-height fluid>
      <v-row class="d-flex justify-center mb-6">
        <v-col cols="12">
          <p class="container__title">SHARE | CONNECT</p>
        </v-col>
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
  background: url('../assets/images/mink-mingle-HRyjETL87Gg-unsplash.jpg')
    no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  color: #fff;
}

.container__title {
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
}
</style>
