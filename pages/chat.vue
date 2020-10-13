<template>
  <div>
    <v-card>
      <v-container>
        <div>
          <div>
            <h3>Chat Group</h3>
            <hr />
          </div>

          <div>
            <div v-for="(msg, index) in messages" :key="index">
              <p>
                <span>{{ msg.user }} : </span>{{ msg.message }}
              </p>
            </div>
          </div>
        </div>

        <div>
          <form @submit.prevent="sendMessage">
            <v-text-field
              v-model="message"
              append-outer-icon="mdi-send"
              label="Message"
              clear-icon="mdi-close-circle"
              clearable
              @click:append-outer="sendMessage"
            >
            </v-text-field>
            <v-btn type="submit">Send</v-btn>
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
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
    })
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()

      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message,
      })
      this.message = ''
    },
  },
}
</script>
