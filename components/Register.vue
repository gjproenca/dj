<template>
  <div>
    <v-card>
      <v-form v-model="isValidForm" @submit.prevent="register">
        <v-row class="pl-7 pr-7">
          <v-col cols="12">
            <v-text-field
              v-model="fullName"
              name="fullName"
              label="Full Name"
            ></v-text-field>
          </v-col>

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
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              :append-icon="confirmShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="confirmShowPassword ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm Password"
              hint="At least 8 characters"
              counter
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn type="submit" :disabled="!isValidForm">Register</v-btn>
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
import emailjs from 'emailjs-com'

export default {
  auth: 'guest',

  data() {
    return {
      isValidForm: false,

      fullName: '',

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

      confirmPassword: '',
      confirmShowPassword: false,
      confirmPasswordRules: [
        (value) => !!value || 'Confirm Password is required',
        (value) => value.length >= 8 || 'Min 8 characters',
        (value) =>
          this.password === this.confirmPassword || 'Passwords must match',
      ],
    }
  },

  methods: {
    ...mapMutations({ toggleShowLogin: 'loginRegister/toggleShowLogin' }),

    register() {
      this.$axios
        .post('/api/user/register', {
          full_name: this.fullName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data._id) {
            this.$toast.success('Successfully registered', {
              icon: {
                name: 'mdi-check',
              },
            })

            // log in if successfully registered
            this.$auth
              .loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password,
                },
              })
              .then(() => {
                // TODO: extract vars to .env
                emailjs.send(
                  'gmail',
                  'template_cinu10s',
                  {
                    to_email: this.email,
                    to_name: this.fullName,
                  },
                  'user_wDhdvZKngf0M0zmdElzxc'
                )
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
        .catch((error) => {
          if (error.response.data.errors) {
            for (const key in error.response.data.errors) {
              this.$toast.error(error.response.data.errors[key].msg, {
                icon: {
                  name: 'mdi-alert',
                },
              })
            }
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
