const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const libraryName = pkg.name;
module.exports = {
  entry:
    process.env.entry === 'css'
      ? {
          avatar: path.join(__dirname, './lib/components/avatar/avatar.scss'),
          badge: path.join(__dirname, './lib/components/badge/badge.scss'),
          base: path.join(__dirname, './lib/base.scss'),
          button: path.join(__dirname, './lib/components/button/button.scss'),
          card: path.join(__dirname, './lib/components/card/card.scss'),
          checkbox: path.join(
            __dirname,
            './lib/components/checkbox/checkbox.scss'
          ),
          checkboxSet: path.join(
            __dirname,
            './lib/components/checkbox-set/checkbox-set.scss'
          ),
          copy: path.join(__dirname, './lib/components/copy/copy.scss'),
          date: path.join(__dirname, './lib/components/date/date.scss'),
          divider: path.join(
            __dirname,
            './lib/components/divider/divider.scss'
          ),
          file: path.join(__dirname, './lib/components/file/file.scss'),
          grid: path.join(__dirname, './lib/components/grid/grid.scss'),
          gridItem: path.join(
            __dirname,
            './lib/components/grid-item/grid-item.scss'
          ),
          heading: path.join(
            __dirname,
            './lib/components/heading/heading.scss'
          ),
          icon: path.join(__dirname, './lib/components/icon/icon.scss'),
          likert: path.join(__dirname, './lib/components/likert/likert.scss'),
          pagination: path.join(
            __dirname,
            './lib/components/pagination/pagination.scss'
          ),
          preloader: path.join(
            __dirname,
            './lib/components/preloader/preloader.scss'
          ),
          progress: path.join(
            __dirname,
            './lib/components/progress/progress.scss'
          ),
          radio: path.join(__dirname, './lib/components/radio/radio.scss'),
          radioSet: path.join(
            __dirname,
            './lib/components/radio-set/radio-set.scss'
          ),
          select: path.join(__dirname, './lib/components/select/select.scss'),
          table: path.join(__dirname, './lib/components/table/table.scss'),
          tableCell: path.join(
            __dirname,
            './lib/components/table-cell/table-cell.scss'
          ),
          tableRow: path.join(
            __dirname,
            './lib/components/table-row/table-row.scss'
          ),
          text: path.join(__dirname, './lib/components/text/text.scss'),
          textarea: path.join(
            __dirname,
            './lib/components/textarea/textarea.scss'
          ),
          toast: path.join(__dirname, './lib/components/toast/toast.scss'),
          toggle: path.join(__dirname, './lib/components/toggle/toggle.scss')
        }
      : {
          all: path.join(__dirname, './lib/index.js')
        },
  output: {
    path: path.join(__dirname, './dist'),
    filename: chunkData => {
      return chunkData.chunk.name === 'all' ? 'index.js' : '[name].js';
    },
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  plugins: [],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name][md5:hash].[ext]'
              //outputPath: 'images/',
              //publicPath: '/images/'
            }
          }
        ]
      },
      {
        test: /\.*css$/,
        use:
          process.env.entry === 'css'
            ? ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
              })
            : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'lib'),
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.(pdf|doc|zip)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      assets: path.resolve(__dirname, './lib/images')
    }
  },
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new CleanWebpackPlugin()
  ];
}

if (process.env.NODE_ENV === 'production' && process.env.entry === 'css') {
  module.exports.plugins = [
    new FixStyleOnlyEntriesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ];
}
