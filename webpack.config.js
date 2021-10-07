const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/app/index",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                "useBuiltIns": "entry"
              }
            ]
          ]
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: "src/static", to: ''},
      ],
    }),
  ],
}
