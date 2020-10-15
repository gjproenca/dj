<template>
  <div>
    <v-card>
      <v-container>
        <div>
          <div>
            <h3>Chat</h3>
            <v-divider></v-divider>
          </div>

          <!-- FIXME: add virtual scroller -->
          <div ref="chat" class="chat">
            <div v-for="(msg, index) in messages" :key="index">
              <p>
                <span>{{ msg.user }}: </span>{{ msg.message }}
              </p>
            </div>
          </div>
        </div>

        <!-- TODO: only allow send message if there is text -->
        <div>
          <form @submit.prevent="sendMessage">
            <v-text-field
              v-model="message"
              append-icon="mdi-send"
              label="Message"
              clear-icon="mdi-close-circle"
              clearable
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
import io from 'socket.io-client'

export default {
  data() {
    return {
      user: this.$auth.user.full_name,
      message: '',
      messages: [],

      socket: io('localhost:3000'),
    }
  },

  updated() {
    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
  },

  mounted() {
    // FIXME: add GUID to room table in mongo db so not to expose user id
    this.socket.emit('JOIN_ROOM', { _id: this.$route.params.id })

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
  max-height: 50vh;
}
</style>
