<template>
  <div>
    <h1>Home</h1>
    <n-link :to="'/room/' + this.$auth.user._id" style="textdecoration: none">
      <v-btn>Create room</v-btn>
    </n-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
