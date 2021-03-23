<template>
  <div>
    <h1>Create Room</h1>

    <v-form @submit.prevent>
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
            counter
            auto-grow
            clearable
            label="Description"
            :rules="rulesDescripton"
            :value="description"
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

      rulesDescripton: [(v) => v || v.length <= 150 || 'Max 150 characters'],
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
              live: true,
            }),
          }
        )

        const RESPONSE_POST_CREATE_ROOM = await POST_CREATE_ROOM.json()

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
