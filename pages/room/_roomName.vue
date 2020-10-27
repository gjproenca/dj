<template>
  <div>
    <!-- TODO: remove next line -->
    {{ user }}

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
    const user = await fetch(`${process.env.BASE_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $auth.getToken('local'),
      },
    })

    const userJson = await user.json()

    return { user: userJson }
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
