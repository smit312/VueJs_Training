const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target:
          "http://www.mockbin.org/bin/acab9b21-f102-41a0-b68e-52070bff1563",
        changeOrigin: true,
      },
    },
  },
});
