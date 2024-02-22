const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");
const { ModuleFederationPlugin } = require("webpack").container;

const packageJSON = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJSON.dependencies,
    }),
  ],
  devtool: "source-map",
};
module.exports = merge(commonConfig, prodConfig);
