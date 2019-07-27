const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "source", "index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "berro",
      template: path.resolve(__dirname, "source", "index.html"),
      favicon: path.resolve(__dirname, "source", "favicon.ico")
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    hot: true
  },
  mode: "development"
};
