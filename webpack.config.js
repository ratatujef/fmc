const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist/js/"),
  },
  watch: true,
  devtool: "source-map",
  module: {},
  plugins: [],
};
