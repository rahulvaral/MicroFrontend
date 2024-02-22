const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");
const { ModuleFederationPlugin } = require("webpack").container;

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
    }),
  ],
  devtool: "source-map",
};
module.exports = merge(commonConfig, devConfig);
