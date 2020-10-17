<template>
  <div>
    <v-card>
      <v-container>
        <div>
          <div>
            <h3>Chat</h3>
            <v-divider></v-divider>
          </div>

          <div v-chat-scroll="{ always: false, smooth: true }" class="chat">
            <div v-for="(msg, index) in messages" :key="index">
              <p>
                <span>{{ msg.user }}: </span>{{ msg.message }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <form @submit.prevent="sendMessage">
            <v-text-field
              v-model="message"
              :append-icon="message.length > 0 ? 'mdi-send' : ''"
              label="Message"
              clear-icon="mdi-close-circle"
              clearable
              autocomplete="off"
              @click:append="sendMessage"
            >
            </v-text-field>
          </form>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    socket: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      user: this.$auth.user.full_name,
      message: '',
      messages: [],
    }
  },

  mounted() {
    this.socket.emit('JOIN_ROOM', { _id: this.$route.params.roomName })

    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
    })
  },

  methods: {
    sendMessage() {
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      })

      this.message = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.chat {
  overflow-y: auto;
  height: 50vh;
}
</style>
