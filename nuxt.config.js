require('dotenv').config()
import config from './utils/config'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + config.defaultSiteName,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vue-api-query',
    '@plugins/filters',
    '@plugins/axios',
    '@plugins/validator',
    '@plugins/i18n',
    '@plugins/vue-cool-lightbox',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/color-mode',
    '@nuxtjs/toast',
  ],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '',
    storageKey: 'app-color-mode',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/auth', '@nuxtjs/axios'],

  axios: {
    baseURL: process.env.API_URL || 'https://dating-api.muzio.dev/api',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'data.access_token',
          },
          user: {
            url: '/me',
            method: 'post',
            propertyName: false,
          },
          logout: {
            url: '/logout',
            method: 'post',
          },
        },
        redirect: {
          login: '/login',
          home: '/dashboard',
        },
      },
    },
    refreshJWT: {
      endpoint: {
        url: '/refresh',
        method: 'post',
      },
      interval: 10, // minutes
    },
  },

  env: {
    pusherAppId: process.env.PUSHER_APP_ID,
    pusherAppKey: process.env.PUSHER_APP_KEY,
    pusherAppSecret: process.env.PUSHER_APP_SECRET,
    pusherAppHost: process.env.PUSHER_APP_HOST,
    pusherAppPort: process.env.PUSHER_APP_PORT,
    wsAuthEndpoint: process.env.WS_AUTH_ENDPOINT,
    siteKey: process.env.SITE_KEY,
    apiUrl: process.env.API_URL,
    baseURL: process.env.API_URL || 'https://dating-api.muzio.dev/api',
  },

  watchers: {
    // Temporary fix: https://github.com/nuxt-community/tailwindcss-module/issues/359
    webpack: {
      ignored: ['**/*.eslintcache', '**/.git/**'],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // add exception
    transpile: ['vee-validate/dist/rules'],
  },
}
