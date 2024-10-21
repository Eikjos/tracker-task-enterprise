// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  build: {},
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
  vueQuery: {
    stateKey: "vue-query-nuxt",
    vueQueryPluginOptions: {},
  },
  imports: {
    autoImport: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@hebilicious/vue-query-nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "shadcn-nuxt",
    "@nuxt/fonts",
  ],
});
