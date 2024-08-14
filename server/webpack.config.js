const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  target: "node",
  devtool: "inline-source-map",
  externals: [nodeExternals()], // removes node_modules from your final bundle
  entry: "./src/server.ts", // make sure this matches the main root of your code
  output: {
    path: path.join(__dirname, "dist"), // this can be any path and directory you want
    filename: "main.js",
  },
  optimization: {
    minimize: true, // enabling this reduces file size and readability
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
