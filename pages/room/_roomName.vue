<template>
  <div>
    <!-- TODO: remove next line -->
    <client-only placeholder="Loading...">
      {{ user }}
    </client-only>

    <v-row fill-height fluid>
      <v-col cols="5">
        <Playlist />
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

  async asyncData({ $auth }) {
    try {
      const request = await fetch(`${process.env.BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: $auth.getToken('local'),
        },
      })

      const user = await request.json()

      return { user }
    } catch (error) {
      console.log(error)
    }
  },

  data() {
    return {
      user: '',
      socket: {},
    }
  },

  beforeMount() {
    this.socket = socket
  },
}
</script>
