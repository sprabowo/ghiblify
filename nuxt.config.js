const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Ghiblify - All About Studio Ghibli',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon-1.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl',
    '~/assets/css/custom.css'
  ],

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes, resolve) {
      let newRoute = [
        ...routes,
        {
          name: 'films-slug',
          path: '/films/:slug',
          chunkName: 'pages/films/_slug',
          component: resolve(__dirname, 'pages/_custom/films_slug.vue')
        },
        {
          name: 'people-slug',
          path: '/people/:slug',
          chunkName: 'pages/people/_slug',
          component: resolve(__dirname, 'pages/_custom/people_slug.vue')
        },
        {
          name: 'vehicles-slug',
          path: '/vehicles/:slug',
          chunkName: 'pages/vehicles/_slug',
          component: resolve(__dirname, 'pages/_custom/vehicles_slug.vue')
        },
        {
          name: 'locations-slug',
          path: '/locations/:slug',
          chunkName: 'pages/locations/_slug',
          component: resolve(__dirname, 'pages/_custom/locations_slug.vue')
        },
        {
          name: 'species-slug',
          path: '/species/:slug',
          chunkName: 'pages/species/_slug',
          component: resolve(__dirname, 'pages/_custom/species_slug.vue')
        }
      ]
      let routerClean = newRoute.filter(o => o.name.indexOf('custom') === -1)
      // console.log(newRoute)
      return routerClean
    }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '~/plugins/mixins.js',
    '~/plugins/autocomplete.js',
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/local-storage.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
