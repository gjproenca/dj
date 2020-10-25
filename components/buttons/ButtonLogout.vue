<template>
  <div>
    <v-btn color="secondary" @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()

      // TODO: toast
      //   this.$toast.success('Successfully de-authenticated', {
      //     icon: {
      //       name: 'mdi-check',
      //     },
      //   })
    },
  },
}
</script>
