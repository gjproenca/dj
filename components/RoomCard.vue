<template>
  <div>
    <v-card align="center">
      <img :src="avatarImageUrl" alt="Room avatar image" class="card__avatar" />
      <v-card-title class="justify-center">{{ title }}</v-card-title>
      <v-card-subtitle
        ><i>by {{ owner }}</i></v-card-subtitle
      >
      <v-card-text>{{ description }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    avatarImageUrl: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    },
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'No description available',
    },
  },
}
</script>

<style lang="scss" scoped>
.card__avatar {
  height: 25vh;
  width: auto;
  padding-top: 16px;
}
</style>
