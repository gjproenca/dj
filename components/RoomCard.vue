<template>
  <div>
    <v-row>
      <v-col cols="3" align="center">
        <v-card>
          <img
            :src="avatarImageUrl"
            alt="Room avatar image"
            style="height: 250px"
          />
          <v-card-title class="justify-center">{{ title }}</v-card-title>
          <v-card-subtitle>{{ owner }}</v-card-subtitle>
          <v-card-text>{{ description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    avatarImageUrl: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/No_image_available_400_x_600.svg/512px-No_image_available_400_x_600.svg.png',
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
