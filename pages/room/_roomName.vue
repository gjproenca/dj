<template>
  <div>
    <Chat :socket="socket" />
  </div>
</template>

<script>
import io from 'socket.io-client'
import Chat from '../../components/Chat.vue'

export default {
  components: {
    Chat,
  },

  data() {
    return {
      socket: io(this.$axios.defaults.baseURL),
    }
  },
}
</script>

<style lang="scss" scoped></style>
