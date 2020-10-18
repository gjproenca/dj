<template>
  <div>
    <Playlist />
    <Chat :socket="socket" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import Chat from '../../components/Chat.vue'
import Playlist from '../../components/Playlist.vue'

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
