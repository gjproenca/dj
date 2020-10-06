<template>
  <div><v-btn type="submit" @click.prevent="logout"> Logout </v-btn></div>
</template>

<script>
export default {
  middleware: 'auth',

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped></style>
