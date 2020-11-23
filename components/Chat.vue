<template>
  <div>
    <v-card>
      <v-container>
        <div>
          <div>
            <h3>Chat</h3>
            <v-divider></v-divider>
          </div>

          <v-virtual-scroll
            v-chat-scroll="{ always: false, smooth: true }"
            :items="messages"
            :bench="3"
            height="390"
            item-height="30"
          >
            <template #default="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.user }}: {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </div>

        <div>
          <form @submit.prevent="sendMessage">
            <v-text-field
              v-model="message"
              :append-icon="message ? 'mdi-send' : ''"
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
      message: '',
      messages: [],
    }
  },

  beforeMount() {
    this.socket.emit('join-room', { roomId: this.$route.params.roomName })

    this.socket.on('new-message', (message) => {
      this.messages.push(message)
    })
  },

  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        user: this.$auth.user.full_name,
        text: this.message.trim(),
      }
      this.message = ''
      this.socket.emit('send-message', message)
    },
  },
}
</script>
