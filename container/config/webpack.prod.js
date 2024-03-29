const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");
const { ModuleFederationPlugin } = require("webpack").container;

const packageJSON = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    }),
  ],
  devtool: "source-map",
};
module.exports = merge(commonConfig, prodConfig);
