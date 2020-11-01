<template>
  <div>
    <v-card>
      <v-form v-model="isValidForm" @submit.prevent="signUp">
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
            <v-btn type="submit" :disabled="!isValidForm">Sign up</v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12">
            <p>
              Already have an account? <a @click="toggleShowSignIn">Sign in</a>
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
    ...mapMutations({ toggleShowSignIn: 'signInSignUp/toggleShowSignIn' }),

    async signUp() {
      try {
        const request = await fetch(`${process.env.BASE_URL}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: this.fullName,
            email: this.email,
            password: this.password,
          }),
        })

        const { _id } = await request.json()

        if (_id) {
          this.$toast.success('Successfully signed up', {
            icon: {
              name: 'mdi-check',
            },
          })

          // sign in if successfully signed up
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })

          await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_SIGN_UP_TEMPLATE_ID,
            {
              to_email: this.email,
              to_name: this.fullName,
            },
            process.env.EMAILJS_USER_ID
          )
        }
      } catch (error) {
        if (error.response.data.errors) {
          for (const key in error.response.data.errors) {
            this.$toast.error(error.response.data.errors[key].msg, {
              icon: {
                name: 'mdi-alert',
              },
            })
          }
        } else {
          console.log(error)
        }
      }
    },
  },
}
</script>
