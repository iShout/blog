export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  build:{
    analyze: {
      analyzerMode: 'static'
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  head: {
    title: 'blog',
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
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/animate-css',
    '@/plugins/echarts',
    '@/plugins/lodash',
    '@/plugins/axios.js',
    { src: '@/plugins/mavon-editor.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],
  router: {
    middleware: 'auth',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    [
      '@nuxtjs/markdownit',
      {
        preset: 'default',
        linkify: true,
        breaks: true,
        use: [
          'markdown-it-div',
          'markdown-it-highlightjs',
          'markdown-it-mark',
          'markdown-it-deflist',
        ],
        runtime: true, // Support `$md()`
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
