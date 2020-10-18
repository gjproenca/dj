<template>
  <div>
    <h1>Home</h1>

    <div v-for="(room, index) in rooms" :key="index">
      <n-link :to="'/room/' + room.room_name" class="link">
        <v-btn>Join Room {{ room.room_name }}</v-btn>
      </n-link>

      <v-divider class="mt-3 mb-3" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $auth }) {
    const { data } = await $axios.get(
      `${$axios.defaults.baseURL}/api/rooms/on-air`,
      {
        headers: {
          Authorization: $auth.getToken('local'),
        },
      }
    )
    return { rooms: data.rooms }
  },

  data() {
    return {
      rooms: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
