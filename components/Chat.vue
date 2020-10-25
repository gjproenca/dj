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
            <template v-slot="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.user }}: {{ item.message }}
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
