<template>
  <div>
    <h3>Playlist</h3>
    <v-text-field v-model="playlistId" label="Playlist Id"></v-text-field>

    <v-virtual-scroll
      v-chat-scroll="{ always: false, smooth: true }"
      :items="playlistItems"
      :bench="3"
      height="150"
      item-height="50"
    >
      <template v-slot="{ item }">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="item.snippet.thumbnails.default.url"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.snippet.position + 1 }} - {{ item.snippet.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>

    <v-btn @click="loadPlaylist">Load Playlist</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId: '',
      playlistItems: [],
    }
  },

  methods: {
    loadPlaylist() {
      //  PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U

      fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.playlistItems = data.items
        })

      // FIXME: axios not workingonly fetch
      //   this.playlistItems = await this.$axios.get(
      //     `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`
      //   )
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
