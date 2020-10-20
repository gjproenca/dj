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
import io from 'socket.io-client'
import Chat from '@/components/Chat.vue'
import Playlist from '@/components/Playlist.vue'

export default {
  components: {
    Chat,
    Playlist,
  },

  async asyncData({ $axios, $auth }) {
    const user = await fetch(`${$axios.defaults.baseURL}/api/user`, {
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
      socket: io(this.$axios.defaults.baseURL),
    }
  },
}
</script>

<style lang="scss" scoped></style>
