export default {
  // Disable server-side rendering
  ssr: false,

  // Global page headers
  head: {
    title: 'mastermind-game',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (includi il file tailwind qui)
  css: [
    '@/assets/css/tailwind.css'
  ],

  // Auto import components
  components: true,

  // Build and dev modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  // Build configuration
  build: {},
};
