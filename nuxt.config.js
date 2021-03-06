import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  env: {
    WS_URL: process.env.WS_URL || process.env.BASE_URL,
  },

  serverMiddleware: ['@/api/index.js'],

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | dj',
    title: 'dj',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/toast.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/vue-chat-scroll.js', '@/plugins/vue-youtube.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '~/io', '@nuxtjs/toast'],

  toast: { className: 'toast', iconPack: 'mdi', duration: '5000' },

  router: {
    middleware: ['auth'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // required for the @nuxtjs/auth module baseUrl
    baseURL: process.env.BASE_URL,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          // these are the API endpoints created in Express
          login: {
            url: '/api/user/sign-in',
            method: 'post',
            propertyName: 'token',
          },
          logout: true,
          user: {
            url: '/api/user',
            method: 'get',
            propertyName: 'user',
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/', // User will be redirected to this path if sign in is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      home: '/home', // User will be redirected to this path after sign in if accessed sign in page directly
    },
    rewriteRedirects: true,
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
