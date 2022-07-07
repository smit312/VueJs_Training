export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "demo",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // {
      //   rel: "stylesheet",
      //   href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-vue/2.22.0/bootstrap-vue.min.js",
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: [{ src: "~/plugins/vee-validate.js", ssr: true }],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/composition-api/module"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],

  axios: { proxy: true },
  proxy: {
    "/api": {
      target: "http://www.mockbin.org/bin/acab9b21-f102-41a0-b68e-52070bff1563",

      changeOrigin: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
};
