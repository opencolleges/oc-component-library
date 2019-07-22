const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = async ({ config, mode }) => {
  config.resolve.extensions = ['.ts', '.js', '.json', '.css', '.scss', '.sass'];

  config.module.rules.push({
    test: /\.ts$/,
    use: ['ts-loader']
  });

  config.module.rules.push({
    test: /\.*css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        'sass-loader'
      ]
    })
  });

  config.resolve.alias = {
    assets: path.resolve(__dirname, '../lib/images')
  };

  config.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  );

  return config;
};
