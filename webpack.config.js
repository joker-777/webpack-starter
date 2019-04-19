const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    library: "starter",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "withContext",
      hash: true,
      template: "./src/index.html" // Load a custom template (ejs by default see the FAQ for details)
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendor: {
          name: "vendor",
          chunks: (chunk) => { return chunk.name === "app" },
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  }
};
