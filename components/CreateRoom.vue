<template>
  <div>
    <h1>Create Room</h1>

    <v-form @submit.prevent="createRoom">
      <v-text-field
        v-model="roomName"
        label="Room name"
        :append-icon="roomName ? 'mdi-send' : ''"
        clear-icon="mdi-close-circle"
        clearable
        @click:append="createRoom"
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
const mongoose = require('mongoose')

export default {
  data() {
    return {
      roomName: '',
    }
  },

  methods: {
    async createRoom() {
      try {
        const request = await fetch(`${process.env.BASE_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
        })

        const { user } = await request.json()

        const id = new mongoose.Types.ObjectId(user._id)

        await fetch(`${process.env.BASE_URL}/api/room`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
          body: JSON.stringify({
            room_name: this.roomName,
            created_by: id,
            live: true,
          }),
        })

        this.$toast.success('Room created', {
          icon: {
            name: 'mdi-check',
          },
        })

        this.roomName = ''

        this.$nuxt.refresh()
      } catch (error) {
        if (error.response.data.errors) {
          for (const key in error.response.data.errors) {
            this.$toast.error(error.response.data.errors[key].msg, {
              icon: {
                name: 'mdi-alert',
              },
            })
          }
        }
      }
    },
  },
}
</script>
