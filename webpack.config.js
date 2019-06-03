var path = require("path"),
  webpack = require("webpack"),
  version = require("./package.json").version;

module.exports = {
  entry: path.resolve(__dirname, "src") + "/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "backbone-vue.js",
    library: "BackboneVue",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `Backbone-Vue v${version}
https://github.com/ProjectHuddle/backbone-vue
@license MIT`
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
