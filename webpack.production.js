const merge = require("webpack-merge");
const path = require("path");

const base = require("./webpack.config.js");

const extension = {
  mode: "production",
  devtool: "source-map",
};

module.exports = merge(base, extension);
