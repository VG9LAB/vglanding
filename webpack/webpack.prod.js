const {resolve} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
  new CleanWebpackPlugin(),
];

const tsRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: 'ts-loader',
}

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, '..', 'build'),
    // publicPath: 'http://192.168.254.12:4011/',
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
