<template>
  <div>
    <v-btn v-if="this.$auth.loggedIn" @click.prevent="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('Successfully deauthenticated', {
        icon: {
          name: 'mdi-check',
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
