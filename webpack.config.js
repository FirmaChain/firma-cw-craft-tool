const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser'),
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]);

  return config;
};
