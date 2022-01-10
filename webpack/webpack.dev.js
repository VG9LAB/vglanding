const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

const plugins = [
  new ModuleFederationPlugin({
    name: 'vglanding',
    filename: 'remoteEntry.js',
    exposes: {
      './Landing': './src/bootstrap',
    },
    shared: packageJson.dependencies,
  }),
  new HTMLWebpackPlugin({
    template: 'public/index.html'
  }),
  new CleanWebpackPlugin(),
];

const tsRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: 'ts-loader',
}

module.exports = {
  mode: 'development',
  output: {
    path: resolve(__dirname, '..', 'build'),
    // publicPath: 'http://192.168.254.12:4011/',
  },
  devServer: {
    port: 4011,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins,
  module: {
    rules: [tsRule],
  },
  // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  }
}
