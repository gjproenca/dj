<template>
  <div>
    <h3>Playlist</h3>
    <v-text-field v-model="playlistId" label="Playlist Id"></v-text-field>
    <v-btn @click="loadPlaylist">Load Playlist</v-btn>

    <v-virtual-scroll height="100" item-height="20"> </v-virtual-scroll>
    {{ playlistItems }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId: '',
      playlistItems: ['Nothing'],
    }
  },

  methods: {
    async loadPlaylist() {
      // PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U

      this.playlistItems = await this.$axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLH69W7vrLQqZuiM2YbS8prU7ddDWZuM7U&key=${process.env.YOUTUBE_API_KEY}`,
        {
          headers: {
            Accept: 'application/json',
            Origin: 'https://www.youtube.com/',
          },
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
