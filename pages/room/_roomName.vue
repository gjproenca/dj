<template>
  <div>
    <v-row fill-height fluid>
      <v-col cols="5">
        <Playlist :isOwner="owner" />
      </v-col>
      <v-col cols="2" align="center">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="5">
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
      const token = $auth.getToken('local')

      const requestUser = await fetch(`${process.env.BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      const {
        user: { _id: userId },
      } = await requestUser.json()

      const requestRoom = await fetch(`${process.env.BASE_URL}/api/room`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
          room_name: params.roomName,
        },
      })
      const {
        room: { created_by: createdBy },
      } = await requestRoom.json()

      return { owner: userId === createdBy }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      owner: undefined,

      socket: {},
    }
  },

  beforeMount() {
    this.socket = socket
  },
}
</script>
