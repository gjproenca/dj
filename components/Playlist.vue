<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3>Playlist</h3>
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12">
        <iframe
          v-if="iframeSrc"
          width="100%"
          height="333"
          :src="iframeSrc"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-text-field v-model="playlistId" label="Playlist Id"></v-text-field>
      </v-col>

      <v-col cols="1">
        <v-btn @click="loadPlaylist">Load Playlist</v-btn>
      </v-col>
    </v-row>

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
              <v-list-item-title
                @click="setIframeSrc(item.snippet.resourceId.videoId)"
              >
                {{ item.snippet.position + 1 }} - {{ item.snippet.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId: '',
      playlistItems: [],
      iframeSrc: undefined,
    }
  },

  methods: {
    loadPlaylist() {
      fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.playlistItems = data.items
          console.log(data.items)
        })

      // FIXME: axios not workingonly fetch
      //   this.playlistItems = await this.$axios.get(
      //     `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`
      //   )
    },

    setIframeSrc($event) {
      this.iframeSrc = `https://www.youtube-nocookie.com/embed/${$event}?autoplay=1`
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
