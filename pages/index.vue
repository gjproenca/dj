<template>
  <div class="wrapper">
    <div class="wrapper_filter-blue">
      <v-container class="container" fill-height fluid>
        <v-row class="d-flex justify-center">
          <v-col class="foo" sm="8" md="6">
            <SignIn v-if="getShowSignIn" />
            <SignUp v-else />
          </v-col>
        </v-row>
      </v-container>
    </div>
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
  background-image: url('~assets/images/index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.wrapper_filter-blue {
  background-color: #292d31;
  opacity: 0.9;
}

.container {
  height: 100vh;
  opacity: 1;
}

.wrapper_filter-blue > .container {
  opacity: 1;
}

.foo {
  opacity: 1;
}
</style>
