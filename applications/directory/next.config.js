const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const zlib = require('zlib');

const { NODE_ENV, ASSETS_URL, DIRECTORY_API_URL, CONTACT_EMAIL } = process.env;
const dev = NODE_ENV !== 'production';

module.exports = {
  webpack: (config) => {
    if (dev) {
      // Enable ESLint checking during development.
      config.plugins.push(new ESLintPlugin({ cache: true }));
    }

    if (!dev) {
      // Enable compression in production.
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11
            }
          },
          threshold: 10240,
          minRatio: 0.8
        })
      );

      // Add support for .svg files.
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });
    }
    return config;
  },
  // Prefix URL for all static assets. Disable prefixing in dev mode as this breaks mobile testing.
  assetPrefix: dev ? '' : `${ASSETS_URL}/directory`,
  target: 'serverless',
  trailingSlash: true,
  webpack5: true,
  crossOrigin: 'anonymous',
  env: {
    DIRECTORY_API_URL,
    CONTACT_EMAIL
  }
};
