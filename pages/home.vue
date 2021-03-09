<template>
  <div>
    <v-container>
      <CreateRoom />

      <h1>Rooms</h1>

      <!-- <client-only placeholder="Loading..."> -->
      <div v-if="rooms.length">
        <div v-for="(room, index) in rooms" :key="index">
          <n-link :to="encodeURI(`/room/${room.room_name}`)" class="link">
            <v-btn>Join Room {{ room.room_name }}</v-btn>
          </n-link>

          <v-divider class="mt-3 mb-3" />
        </div>
      </div>
      <div v-else>
        {{ error }}
      </div>
      <!-- </client-only> -->

      <RoomCard title="Test Room" owner="by Test Owner" />
    </v-container>
  </div>
</template>

<script>
import CreateRoom from '@/components/CreateRoom.vue'
import RoomCard from '@/components/RoomCard.vue'

export default {
  components: {
    CreateRoom,
    RoomCard,
  },

  async asyncData({ $auth }) {
    try {
      const request = await fetch(`${process.env.BASE_URL}/api/rooms/live`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: $auth.getToken('local'),
        },
      })
      const data = await request.json()
      return data.rooms ? { rooms: data.rooms } : { error: data.error }
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
