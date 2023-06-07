export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'qr.coremenus.com',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
    script: [
        { src: 'https://kit.fontawesome.com/aeb6e7a7c3.js', crossorigin: 'anonymous'}, 
        { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'},
    ]
  },

  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },

  env: {
    BASE_URL: process.env.BASE_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  ssr: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/socket-io.js', '@/plugins/i18n.js', '@/plugins/vuex-orm-axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL + "/api",
  },

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        dir: 'ltr'
      },
      {
        code: 'ar',
        file: 'ar.js',
        dir: 'rtl'
      }
    ],
    lazy: false,
    langDir: 'lang/',
    strategy: 'prefix',
    defaultLocale: 'en'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
