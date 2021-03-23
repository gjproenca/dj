<template>
  <div>
    <h1>Create Room</h1>

    <v-form @submit.prevent="createRoom">
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="roomName"
            label="Room name"
            :append-icon="roomName ? 'mdi-send' : ''"
            clearable
            @click:append="createRoom"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-file-input accept="image/*" label="Room avatar"></v-file-input>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="description"
            counter
            auto-grow
            clearable
            label="Description"
            rows="1"
            :rules="rulesDescripton"
            @click:clear.prevent.stop
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
const mongoose = require('mongoose')

export default {
  data() {
    return {
      roomName: '',
      description: '',

      rulesDescripton: [(v) => !v || v.length <= 150 || 'Max 150 characters'],
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

        const POST_CREATE_ROOM = await fetch(
          `${process.env.BASE_URL}/api/room`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$auth.getToken('local'),
            },
            body: JSON.stringify({
              room_name: this.roomName,
              owner_id: id,
              owner_name: user.full_name,
              description: this.description,
              live: true,
            }),
          }
        )

        const RESPONSE_POST_CREATE_ROOM = await POST_CREATE_ROOM.json()

        // Show toast errors when creating a room, errors.owner_id.msg
        // for a user trying to create more than one room.
        // Errors.room_name.msg for when a user is able and tries to create a room
        // but the name is already taken
        if (RESPONSE_POST_CREATE_ROOM.errors) {
          this.$toast.error(
            RESPONSE_POST_CREATE_ROOM.errors.owner_id.msg ||
              RESPONSE_POST_CREATE_ROOM.errors.room_name.msg,
            {
              icon: {
                name: 'mdi-alert',
              },
            }
          )
          return
        } else {
          this.$toast.success('Room created', {
            icon: {
              name: 'mdi-check',
            },
          })
        }

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
