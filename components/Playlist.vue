<template>
  <div>
    <v-card>
      <v-container>
        <div>
          <h3>Playlist</h3>
          <v-divider></v-divider>
          <youtube
            ref="youtube"
            :video-id="videoInfo.videoId"
            :player-vars="playerVars"
            :fit-parent="true"
            :resize="true"
            @playing="playing"
            @paused="paused"
            @ended="ended"
          ></youtube>
        </div>

        <v-row v-if="playlistVideoIds.length">
          <v-col cols="4" align="center">
            <v-btn @click="previousVideo">
              <div class="mdi mdi-36px mdi-skip-previous-circle-outline"></div>
            </v-btn>
          </v-col>

          <v-col cols="4" align="center">
            <v-btn v-if="isPlaying" @click="playVideo">
              <div class="mdi mdi-36px mdi-play-circle-outline"></div>
            </v-btn>

            <v-btn v-else @click="pauseVideo">
              <div class="mdi mdi-36px mdi-pause-circle-outline"></div>
            </v-btn>
          </v-col>

          <v-col cols="4" align="center">
            <v-btn @click="nextVideo">
              <div class="mdi mdi-36px mdi-skip-next-circle-outline"></div>
            </v-btn>
          </v-col>

          <v-col cols="12" align="center">
            <div>
              {{ Math.floor(videoInfo.videoProgress / 60) }}:{{
                videoInfo.videoProgress -
                Math.floor(videoInfo.videoProgress / 60) * 60
              }}
              /
              {{ Math.floor(videoInfo.videoLength / 60) }}:{{
                // ~~ Is a shorthand for Math.floor
                ~~(
                  videoInfo.videoLength -
                  Math.floor(videoInfo.videoLength / 60) * 60
                )
              }}
              <v-slider
                v-model="videoInfo.videoProgress"
                :max="videoInfo.videoLength"
                @mouseup="sliderMouseUpVideoProgress"
                @mousedown="sliderMouseDownVideoProgress"
              >
              </v-slider>
            </div>
          </v-col>
        </v-row>

        <v-row v-if="isOwner">
          <v-col cols="12">
            <v-text-field
              v-model="playlistId"
              label="Playlist Id/Url"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-btn :disabled="!playlistId" @click="loadPlaylist"
              >Load Playlist</v-btn
            >
          </v-col>

          <v-col v-if="playlistItems.length !== 0" cols="6">
            <v-btn :disabled="!playlistId" @click="updatePlaylist"
              >Update Playlist</v-btn
            >
          </v-col>
        </v-row>

        <v-row v-if="playlistItems.length">
          <v-col cols="12">
            <v-virtual-scroll
              ref="virtualScroll"
              v-chat-scroll="{ always: false, smooth: true }"
              :items="playlistItems"
              height="250"
              item-height="50"
            >
              <template #default="{ item }">
                <v-list-item>
                  <v-list-item-avatar rounded>
                    <v-img :src="item.snippet.thumbnails.default.url"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <!-- TODO: refactor possibly extract 2 different component when is owner and when it isnt or extract smaller components from this like load playlist video and playlist items -->
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
      playlistId: '',
      playlistItems: [],
      // FIXME: Find way to remove playlist video ids ie: only use
      // playlist items
      playlistVideoIds: [],

      videoInfo: {
        position: undefined,
        videoId: undefined,
        videoLength: 0,
        videoProgress: 0,
      },
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        iv_load_policy: 3,
      },

      isPlaying: false,

      videoProgressInterval: undefined,
    }
  },

  watch: {
    // Watch position property of videoInfo object
    'videoInfo.position'() {
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
        this.playlistItems = []
        // FIXME: playlist id url extraction not working correctly
        let playlistId = this.playlistId.match(/list=\w+/)

        if (playlistId) {
          playlistId = playlistId[0].replace('list=', '')
        } else {
          playlistId = this.playlistId
        }

        // Attempt to load playlist from mongoDb
        const requestReadPlaylistMongo = await fetch(
          `${process.env.BASE_URL}/api/playlist`,
          {
            method: 'GET',
            headers: {
              Authorization: this.$auth.getToken('local'),
              playlist_id: playlistId,
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

          // TODO: adapt or extract to playlist to playlist utils so I can update the playlist

          do {
            requestReadPlaylistYoutube = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${nextPageToken}&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
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
              playlist_id: playlistId,
              playlist_items: this.playlistItems,
            }),
          })
        } else {
          // Assign the mongoDb response with the playlist to the playlistItems variable
          this.playlistItems = responseReadPlaylistMongo.playlist.playlist_items
        }

        this.playlistVideoIds = await this.playlistItems.map(
          (item) => item.snippet.resourceId.videoId
        )

        // Autoplay if playlist has videos
        if (this.playlistVideoIds[0]) {
          this.videoInfo.position = 0
          this.videoInfo.videoId = this.playlistVideoIds[0]
        }
      } catch (error) {
        this.$toast.error(error.message, {
          icon: {
            name: 'mdi-alert',
          },
        })
      }
    },

    async updatePlaylist() {
      alert('Are you sure?')
      try {
        await fetch(`${process.env.BASE_URL}/api/playlist/${this.playlistId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: this.$auth.getToken('local'),
          },
        })

        this.playlistItems = await []

        await this.loadPlaylist()
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
      this.videoInfo.position = this.playlistVideoIds.indexOf(
        this.videoInfo.videoId
      )
    },

    playVideo() {
      this.$refs.youtube.player.playVideo()
    },

    pauseVideo() {
      this.$refs.youtube.player.pauseVideo()
    },

    async playing() {
      this.isPlaying = false
      this.videoInfo.videoLength = await this.$refs.youtube.player.getDuration()

      if (this.videoProgressInterval) {
        clearInterval(this.videoProgressInterval)
      }

      this.videoProgressInterval = setInterval(
        () => this.videoInfo.videoProgress++,
        1000
      )

      this.$refs.virtualScroll.$el.scrollTop = this.videoInfo.position * 53
    },

    paused() {
      this.isPlaying = true

      if (this.videoProgressInterval) {
        clearInterval(this.videoProgressInterval)
      }
    },

    nextVideo() {
      if (this.videoInfo.position < this.playlistVideoIds.length) {
        this.videoInfo.position++
        this.videoInfo.videoId = this.playlistVideoIds[this.videoInfo.position]
      }

      this.videoInfo.videoProgress = 0
    },

    previousVideo() {
      if (this.videoInfo.position > 0) {
        this.videoInfo.position--
        this.videoInfo.videoId = this.playlistVideoIds[this.videoInfo.position]
      }

      this.videoInfo.videoProgress = 0
    },

    ended() {
      this.nextVideo()
    },

    sliderMouseDownVideoProgress() {
      if (this.videoProgressInterval) {
        clearInterval(this.videoProgressInterval)
      }
    },

    sliderMouseUpVideoProgress() {
      this.$refs.youtube.player.seekTo(this.videoInfo.videoProgress)
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
