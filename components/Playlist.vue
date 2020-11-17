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
      // FIXME: Find way to remove playlist video ids ie: only use
      // playlist items
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
        // Attempt to load playlist from mongoDb
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

        // If playlist does not exist in mongoDb fetch it from youtube
        // and create/save it to mongoDb
        if (responseReadPlaylistMongo.error) {
          let nextPageToken = ''
          let requestReadPlaylistYoutube
          let responseReadPlaylistYoutube

          do {
            requestReadPlaylistYoutube = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${this.playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            responseReadPlaylistYoutube = await requestReadPlaylistYoutube.json()

            // Check if playlist exists
            if (responseReadPlaylistYoutube?.error?.code === 404) {
              throw new Error('Playlist not found')
            }

            this.playlistItems = [
              ...this.playlistItems,
              ...responseReadPlaylistYoutube.items,
            ]

            nextPageToken = responseReadPlaylistYoutube.nextPageToken
          } while (nextPageToken)

          // Create playlist in mongoDb
          fetch(`${process.env.BASE_URL}/api/playlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
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

        // Cue first and second playlist videos or first video
        // if it only has one
        this.$refs.youtube.player.cuePlaylist(
          this.playlistVideoIds[1]
            ? [this.playlistVideoIds[0], this.playlistVideoIds[1]]
            : [this.playlistVideoIds[0]],
          0
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
      this.videoInfo.videoId = $event.videoId
      const indexVideoId = this.playlistVideoIds.indexOf(this.videoInfo.videoId)
      this.videoInfo.position = indexVideoId

      try {
        let cuePlaylist = []

        if (indexVideoId === 0 && this.playlistVideoIds.length === 1) {
          cuePlaylist = [this.playlistVideoIds[0]]
          return this.$refs.youtube.player.cuePlaylist(cuePlaylist, 0)
        } else if (indexVideoId === 0 && this.playlistVideoIds[1]) {
          cuePlaylist = [this.playlistVideoIds[0], this.playlistVideoIds[1]]
          return this.$refs.youtube.player.cuePlaylist(cuePlaylist, 0)
        } else if (
          indexVideoId > 0 &&
          indexVideoId < this.playlistVideoIds.length - 1
        ) {
          cuePlaylist = [
            this.playlistVideoIds[indexVideoId - 1],
            this.playlistVideoIds[indexVideoId],
            this.playlistVideoIds[indexVideoId + 1],
          ]

          return this.$refs.youtube.player.cuePlaylist(cuePlaylist, 1)
        } else {
          cuePlaylist = [
            this.playlistVideoIds[indexVideoId - 1],
            this.playlistVideoIds[indexVideoId],
          ]

          return this.$refs.youtube.player.cuePlaylist(cuePlaylist, 1)
        }
      } catch (error) {
        console.log(error.message)
      }
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
