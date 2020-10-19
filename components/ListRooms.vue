<template>
  <div>
    <h1>Rooms</h1>

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
  data() {
    return {
      rooms: [],
    }
  },

  async mounted() {
    const { data } = await this.$axios.get(
      `${this.$axios.defaults.baseURL}/api/rooms/on-air`,
      {
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
      }
    )

    this.rooms = data.rooms
  },
}
</script>

<style lang="scss" scoped></style>
