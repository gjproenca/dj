<template>
  <div>
    <h1>Create Room</h1>

    <v-text-field v-model="roomName" label="Room Name"></v-text-field>
    <v-btn @click="createRoom">Create Room</v-btn>
  </div>
</template>

<script>
const mongoose = require('mongoose')

export default {
  data() {
    return {
      roomName: undefined,
    }
  },

  methods: {
    async createRoom() {
      const user = await this.$axios.get(
        'http://localhost:3000/api/user/user',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdkOGNhOGFhOWM2YzAyZDhiMzY5NzQiLCJlbWFpbCI6Im9zYW9zdG9ybUBnbWFpbC5jb20iLCJmdWxsX25hbWUiOiJvc2FvIHN0b3JtIiwiaWF0IjoxNjAyNDI4MDA1fQ.qKejolE0svNKkhyLfeXOkN6P68dmKFz8DE7PNTbHMQA',
          },
        }
      )

      const id = new mongoose.Types.ObjectId(user.data.user._id)

      const createRoom = await this.$axios.post(
        'http://localhost:3000/api/room/create',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
          room_name: this.roomName,
          created_by: id,
          on_air: true,
        }
      )

      console.log(createRoom)

      //   this.$nuxt.refresh()
    },
  },
}
</script>

<style lang="scss" scoped></style>
