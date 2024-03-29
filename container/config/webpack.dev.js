const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");
const { ModuleFederationPlugin } = require("webpack").container;

const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJSON.dependencies,
    }),
  ],
  devtool: "source-map",
};
module.exports = merge(commonConfig, devConfig);
