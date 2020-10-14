<template>
  <div>
    <h1>Home</h1>
    <n-link :to="'/room/' + this.$auth.user._id" class="link">
      <v-btn>Create room</v-btn>
    </n-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
