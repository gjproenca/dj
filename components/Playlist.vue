<template>
  <div>
    <v-card>
      <v-container>
        <!-- <v-row>
          <v-col cols="12"> -->
        <div>
          <h3>Playlist</h3>
          <v-divider></v-divider>
          <youtube
            ref="youtube"
            :player-vars="playerVars"
            :fit-parent="true"
            :resize="true"
            @cued="playVideo"
          ></youtube>
        </div>
        <!-- </v-col>
        </v-row> -->

        <v-row v-if="isOwner">
          <v-col cols="12">
            <v-text-field
              v-model="playlistId"
              label="Playlist Id"
            ></v-text-field>
            <v-btn @click="loadPlaylist">Load Playlist</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="playlistItems.length">
          <v-col cols="12">
            <v-virtual-scroll
              v-chat-scroll="{ always: false, smooth: true }"
              :items="playlistItems"
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
                        @click="
                          setVideoInfo({
                            position: item.snippet.position,
                            videoId: item.snippet.resourceId.videoId,
                          })
                        "
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
      playlistId: 'PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U',
      playlistItems: [],
      playlistVideoIds: [],

      videoInfo: { position: 0, videoId: '' },
      playerVars: {
        modestbranding: 1,
        iv_load_policy: 3,
      },
    }
  },

  watch: {
    videoInfo() {
      if (this.isOwner) {
        this.socket.emit('new-playlist-item', {
          position: this.videoInfo.position,
          videoId: this.videoInfo.videoId,
        })
      }
    },
  },

  beforeMount() {
    if (!this.isOwner) {
      this.socket.on('refresh-playlist-item', (item) => {
        this.videoInfo.position = item.position
        this.videoInfo.videoId = item.videoId
      })
    }
  },

  methods: {
    async loadPlaylist() {
      try {
        const requestReadPlaylistMongo = await fetch(
          `${process.env.BASE_URL}/api/playlist`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: this.$auth.getToken('local'),
              playlist_id: this.playlistId,
            },
          }
        )
        const responseReadPlaylistMongo = await requestReadPlaylistMongo.json()

        if (responseReadPlaylistMongo.error) {
          const requestReadPlaylistYoutube = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${this.playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          const responseReadPlaylistYoutube = await requestReadPlaylistYoutube.json()

          if (responseReadPlaylistYoutube.error.code === 404) {
            throw new Error('Playlist not found')
          }

          this.playlistItems = responseReadPlaylistYoutube.items

          fetch(`${process.env.BASE_URL}/api/playlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$auth.getToken('local'),
            },
            body: JSON.stringify({
              playlist_id: this.playlistId,
              playlist_items: this.playlistItems,
            }),
          })
        } else {
          this.playlistItems = responseReadPlaylistMongo.playlist.playlist_items
        }

        this.playlistVideoIds = this.playlistItems.map(
          (item) => item.snippet.resourceId.videoId
        )

        this.$refs.youtube.player.cuePlaylist(
          this.playlistVideoIds,
          this.videoInfo.position
        )
      } catch (error) {
        this.$toast.error(error.message, {
          icon: {
            name: 'mdi-alert',
          },
        })
      }
    },

    setVideoInfo($event) {
      this.videoInfo.position = $event.position
      this.videoInfo.videoId = $event.videoId

      this.$refs.youtube.player.cuePlaylist(
        this.playlistVideoIds,
        this.videoInfo.position
      )
    },

    playVideo() {
      this.$refs.youtube.player.playVideo()
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
