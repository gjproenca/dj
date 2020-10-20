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
        const user = await this.$axios.get('http://localhost:3000/api/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
        })

        const id = new mongoose.Types.ObjectId(user.data.user._id)

        await this.$axios.post('http://localhost:3000/api/room', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
          room_name: this.roomName,
          created_by: id,
          live: true,
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

<style lang="scss" scoped></style>
