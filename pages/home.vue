<template>
  <div>
    <h1>Home</h1>

    <div v-for="(room, index) in rooms" :key="index">
      <n-link :to="'/room/' + room.room_name" class="link">
        <v-btn>Join Room</v-btn>
      </n-link>

      Room name: {{ room.room_name }}

      <v-divider class="mt-3 mb-3" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {
    const { data } = await axios.get('http://localhost:3000/api/rooms/on-air')
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
