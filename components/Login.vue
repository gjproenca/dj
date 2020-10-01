<template>
  <div>
    <v-card>
      <v-form>
        <v-row class="pl-7 pr-7">
          <v-col cols="12">
            <!-- FIXME: -->
            {{ loginError }}

            <v-text-field
              v-model="email"
              :rules="emailRules"
              name="email"
              label="E-mail"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.min]"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn @click.prevent="login"> Login </v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12">
            <p>
              Don't have an account? <a @click="toggleShowLogin">Register</a>
            </p>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      loginError: undefined,

      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      password: '',
      showPassword: false,
      passwordRules: {
        required: (value) => !!value || 'Password is required',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
    ...mapMutations({ toggleShowLogin: 'loginRegister/toggleShowLogin' }),

    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        console.log(response)
      } catch (error) {
        // FIXME:
        console.log(error)
        if (error.response.data.message) {
          this.loginError = error.response.data.message
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
