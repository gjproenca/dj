<template>
  <div>
    <youtube
      v-if="videoId"
      :video-id="videoId"
      :player-vars="playerVars"
      :fit-parent="true"
      :resize="true"
    ></youtube>

    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h3>Playlist</h3>
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row v-if="isOwner">
          <v-col cols="8">
            <v-text-field
              v-model="playlistId"
              label="Playlist Id"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-btn @click="loadPlaylist">Load Playlist</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="playlistItems.length">
          <v-col cols="12">
            <v-virtual-scroll
              v-chat-scroll="{ always: false, smooth: true }"
              :items="playlistItems"
              :bench="3"
              height="250"
              item-height="50"
            >
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-avatar rounded>
                    <v-img :src="item.snippet.thumbnails.default.url"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <!-- TODO: refactor possibly extract 2 different component 
                    when is owner and when it isnt or extract smaller components
                    from this like load playlist video and playlist items -->
                    <div v-if="isOwner">
                      <v-list-item-title
                        @click="setVideoId(item.snippet.resourceId.videoId)"
                      >
                        {{ item.snippet.position + 1 }} -
                        {{ item.snippet.title }}
                      </v-list-item-title>
                    </div>
                    <div v-else>
                      <v-list-item-title>
                        {{ item.snippet.position + 1 }} -
                        {{ item.snippet.title }}
                      </v-list-item-title>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-col>
        </v-row>
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
    isOwner: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      playlistId: '',
      playlistItems: [],

      videoId: '',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        iv_load_policy: 3,
      },
    }
  },

  watch: {
    videoId() {
      if (this.isOwner) {
        this.socket.emit('new-playlist-item', { videoId: this.videoId })
      }
    },
  },

  beforeMount() {
    if (!this.isOwner) {
      this.socket.on('refresh-playlist-item', (item) => {
        this.videoId = item.videoId
      })
    }
  },

  methods: {
    async loadPlaylist() {
      try {
        const request = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const { items } = await request.json()
        this.playlistItems = items
      } catch (error) {
        console.log(error)
      }
    },

    setVideoId($event) {
      this.videoId = $event
    },
  },
}
</script>

<style lang="scss" scoped>
.playlist-items {
  height: 30vh;
  overflow-y: auto;
}
</style>
