const webpack = require('webpack');
const path = require('path');

const configureWebpack = (webpackConfig, { env, paths }) => {
    //? Fallbacks
    const fallback = webpackConfig.resolve.fallback || {};
    webpackConfig.resolve.fallback = Object.assign(fallback, {
        crypto: require.resolve('crypto-browserify'),
        'process/browser': require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        os: require.resolve('os-browserify'),
        url: require.resolve('url'),
        fs: require.resolve('browserify-fs'),
        path: require.resolve('path-browserify'),
        util: require.resolve('util'),
        vm: false
    });

    webpackConfig.ignoreWarnings = [/Failed to parse source map/];

    //? Plugins
    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);

    return webpackConfig;
};

const configureCraco = () => {
    return {
        webpack: {
            configure: configureWebpack,
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    };
};

module.exports = configureCraco();
