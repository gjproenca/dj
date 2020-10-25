<template>
  <div>
    <CreateRoom />

    <h1>Rooms</h1>

    <div v-if="rooms.length">
      <div v-for="(room, index) in rooms" :key="index">
        <n-link :to="'/room/' + room.room_name" class="link">
          <v-btn>Join Room {{ room.room_name }}</v-btn>
        </n-link>

        <v-divider class="mt-3 mb-3" />
      </div>
    </div>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script>
import CreateRoom from '@/components/CreateRoom.vue'

export default {
  components: {
    CreateRoom,
  },

  async asyncData({ $axios, $auth }) {
    try {
      const { data } = await $axios.get(
        `${$axios.defaults.baseURL}/api/rooms/live`,
        {
          headers: {
            Authorization: $auth.getToken('local'),
          },
        }
      )
      return { rooms: data.rooms }
    } catch (error) {
      return { error: error.response.data.error }
    }
  },

  data() {
    return {
      rooms: [],
      error: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
