const merge = require("webpack-merge");
const path = require("path");

const DotenvWebpackPlugin = require("dotenv-webpack");

const base = require("./webpack.config.js");

const extension = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new DotenvWebpackPlugin(),
  ]
};

module.exports = merge(base, extension);
