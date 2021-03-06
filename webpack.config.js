const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  plugins: [new CleanWebpackPlugin(["build"]), htmlPlugin],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    library: "@navis/call-queue",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};
