<template>
  <div>
    <div class="jumbotron"></div>

    <v-container>
      <CreateRoom />

      <h1>Rooms</h1>

      <!-- <client-only placeholder="Loading..."> -->
      <div v-if="rooms.length">
        <v-row>
          <v-col
            v-for="(room, index) in rooms"
            :key="index"
            xs="12"
            sm="4"
            md="3"
            xl="2"
          >
            <n-link :to="encodeURI(`/room/${room.room_name}`)" class="link">
              <RoomCard
                :title="room.room_name"
                :owner="room.owner_name"
                :description="room.description"
                :avatar-url="avatarUri(room.avatar.filename)"
              />
            </n-link>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        {{ error }}
      </div>
      <!-- </client-only> -->
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

  methods: {
    avatarUri(avatarFileName) {
      return `${process.env.BASE_URL}/api/room/avatar/${avatarFileName}`
    },
  },
}
</script>

<style lang="scss" scoped>
.jumbotron {
  background-image: url('../assets/images/konstantinos-hasandras-aivbDhWuFyw-unsplash.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: calc(50vh);
  width: auto;
}

.link {
  text-decoration: none;
}
</style>
