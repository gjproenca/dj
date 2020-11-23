<template>
  <div>
    <v-btn color="secondary" @click="signOut">Sign Out</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async signOut() {
      await this.$auth.logout()

      this.$toast.success('Successfully de-authenticated', {
        icon: {
          name: 'mdi-check',
        },
      })
    },
  },
}
</script>
