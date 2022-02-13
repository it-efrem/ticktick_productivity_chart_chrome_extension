const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    ticktick: "./src/ticktick/index.ts",
    extension: "./src/extension/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/static", to: "" }],
    }),
  ],
};
