<template>
  <div>
    <v-row class="mt-2 mb-2" fill-height fluid>
      <v-col cols="6">
        <Playlist :socket="socket" :is-owner="isOwner" />
      </v-col>

      <v-col cols="6">
        <Chat :socket="socket" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chat from '@/components/Chat.vue'
import Playlist from '@/components/Playlist.vue'
import socket from '@/plugins/socket.io.js'

export default {
  components: {
    Chat,
    Playlist,
  },

  async asyncData({ $auth, params }) {
    try {
      const requestRoom = await fetch(`${process.env.BASE_URL}/api/room`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: $auth.getToken('local'),
          room_name: params.roomName,
        },
      })
      const {
        room: { owner_id: ownerId },
      } = await requestRoom.json()

      return { isOwner: $auth.user._id === ownerId }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      isOwner: false,

      socket: {},
    }
  },

  beforeMount() {
    this.socket = socket
  },
}
</script>
