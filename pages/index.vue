<template>
  <div>
    <v-container style="height: 100vh" fill-height fluid>
      <v-row class="d-flex justify-center">
        <v-col sm="8" md="6">
          <Login v-if="getShowLogin" />
          <Register v-else />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  components: {
    Login,
    Register,
  },
  computed: {
    ...mapGetters({ getShowLogin: 'loginRegister/getShowLoginState' }),
  },
}
</script>
