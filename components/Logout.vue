<template>
  <div>
    <v-btn elevation="0" color="secondary" @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
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

<style lang="scss" scoped></style>
