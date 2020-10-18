<template>
  <div>
    <h3>Playlist</h3>
    <v-text-field v-model="playlistId" label="Playlist Id"></v-text-field>
    <!-- FIXME: fix this and remove proxy -->
    <v-virtual-scroll :items="item" height="100" item-height="20">
      <template v-slot="{ item }">
        <v-list-item :key="item">
          <v-list-item-content>
            <v-list-item-title>
              {{ item }}
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
      item: ['asd', 'asd', 'asd', 'asd'],
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
          this.item = data.items
          console.log(data)
        })

      // FIXME: axios not workingonly fetch
      //   this.playlistItems = await this.$axios.get(
      //     `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`
      //   )
    },
  },
}
</script>

<style lang="scss" scoped></style>
