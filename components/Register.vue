<template>
  <div>
    <v-card>
      <v-form @submit.prevent="login">
        <v-row class="pl-7 pr-7">
          <v-col cols="12">
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

          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                consfirmPasswordRules.required,
                consfirmPasswordRules.match,
              ]"
              :type="showConfirmPassword ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm Password"
              hint="At least 8 characters"
              counter
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn type="submit"> Login </v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12">
            <p>
              Already have an account? <a @click="toggleShowLogin">Login</a>
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

      confirmPassword: '',
      showConfirmPassword: false,
      consfirmPasswordRules: {
        required: (value) => !!value || 'Confirm password is required',
        match: (value) =>
          this.password !== this.confirmPassword
            ? 'Passwords must match'
            : 'Passwords match',
      },
    }
  },
  methods: {
    ...mapMutations({ toggleShowLogin: 'loginRegister/toggleShowLogin' }),

    // TODO: register method
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
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
