<template>
  <div>
    <v-card>
      <v-form>
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
        </v-row>

        <v-row>
          <v-col class="d-flex justify-center" cols="12">
            <v-btn @click.prevent="buttonLogin"> Login </v-btn>
          </v-col>
          <v-col class="d-flex justify-center" cols="12">
            <p>Don't have an account? Register</p>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    buttonLogin: {
      type: Function,
      default: undefined,
    },
  },
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
        required: (value) => !!value || 'Password is equired',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
