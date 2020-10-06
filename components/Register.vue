<template>
  <div>
    <v-card>
      <v-form v-model="isValidForm" @submit.prevent="register">
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
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
              v-model="password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="confirmPassword"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn type="submit" :disabled="!isValidForm"> Register </v-btn>
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
      isValidForm: false,

      email: '',
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],

      password: '',
      showPassword: false,
      passwordRules: [
        (value) => !!value || 'Password is required',
        (value) => value.length >= 8 || 'Min 8 characters',
      ],
    }
  },

  methods: {
    ...mapMutations({ toggleShowLogin: 'loginRegister/toggleShowLogin' }),

    async register() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (error) {
        if (error.response.data.message) {
          // TODO: put toast
          //   error.response.data.message
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
