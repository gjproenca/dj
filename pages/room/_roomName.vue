<template>
  <div>
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

  data() {
    return {
      socket: io(this.$axios.defaults.baseURL),
    }
  },
}
</script>

<style lang="scss" scoped></style>
