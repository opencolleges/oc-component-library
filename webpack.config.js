const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const libraryName = pkg.name;
module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {},
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
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

// If environment is development
if (process.env.NODE_ENV !== 'production') {
  module.exports.entry = {
    index: path.join(__dirname, './lib/index.js'),
    all: path.join(__dirname, './lib/all.scss')
  };
  module.exports.module.rules.push({
    test: /\.*css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  });
  module.exports.plugins = [
    new FixStyleOnlyEntriesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ];
}

// If environment is production (NOT CSS)
if (process.env.NODE_ENV === 'production') {
  module.exports.entry = {
    index: path.join(__dirname, './lib/index.js')
  };
  module.exports.plugins = [new CleanWebpackPlugin()];
  module.exports.module.rules.push({
    test: /\.*css$/,
    use: 'ignore-loader'
  });
}

// If environment is production (CSS)
if (process.env.NODE_ENV === 'production' && process.env.entry === 'css') {
  module.exports.entry = {
    all: path.join(__dirname, './lib/all.scss'),
    accordion: path.join(__dirname, './lib/accordion/accordion.scss'),
    avatar: path.join(__dirname, './lib/avatar/avatar.scss'),
    badge: path.join(__dirname, './lib/badge/badge.scss'),
    base: path.join(__dirname, './lib/base.scss'),
    button: path.join(__dirname, './lib/button/button.scss'),
    card: path.join(__dirname, './lib/card/card.scss'),
    checkbox: path.join(__dirname, './lib/checkbox/checkbox.scss'),
    'checkbox-set': [
      path.join(__dirname, './lib/checkbox-set/checkbox-set.scss'),
      path.join(__dirname, './lib/checkbox/checkbox.scss')
    ],
    copy: path.join(__dirname, './lib/copy/copy.scss'),
    date: path.join(__dirname, './lib/date/date.scss'),
    divider: path.join(__dirname, './lib/divider/divider.scss'),
    file: path.join(__dirname, './lib/file/file.scss'),
    grid: [
      path.join(__dirname, './lib/grid/grid.scss'),
      path.join(__dirname, './lib/grid-item/grid-item.scss')
    ],
    'grid-item': path.join(__dirname, './lib/grid-item/grid-item.scss'),
    heading: path.join(__dirname, './lib/heading/heading.scss'),
    icon: path.join(__dirname, './lib/icon/icon.scss'),
    likert: path.join(__dirname, './lib/likert/likert.scss'),
    modal: path.join(__dirname, './lib/modal/modal.scss'),
    pagination: path.join(__dirname, './lib/pagination/pagination.scss'),
    preloader: path.join(__dirname, './lib/preloader/preloader.scss'),
    progress: path.join(__dirname, './lib/progress/progress.scss'),
    radio: path.join(__dirname, './lib/radio/radio.scss'),
    range: path.join(__dirname, './lib/range/range.scss'),
    'radio-set': [
      path.join(__dirname, './lib/radio-set/radio-set.scss'),
      path.join(__dirname, './lib/radio/radio.scss')
    ],
    reset: path.join(__dirname, './lib/reset.scss'),
    select: path.join(__dirname, './lib/select/select.scss'),
    'skeleton-loader': path.join(
      __dirname,
      './lib/skeleton-loader/skeleton-loader.scss'
    ),
    table: path.join(__dirname, './lib/table/table.scss'),
    'table-cell': path.join(__dirname, './lib/table-cell/table-cell.scss'),
    'table-row': path.join(__dirname, './lib/table-row/table-row.scss'),
    text: path.join(__dirname, './lib/text/text.scss'),
    textarea: path.join(__dirname, './lib/textarea/textarea.scss'),
    toast: path.join(__dirname, './lib/toast/toast.scss'),
    toaster: [
      path.join(__dirname, './lib/toaster/toaster.scss'),
      path.join(__dirname, './lib/toast/toast.scss')
    ],
    toggle: path.join(__dirname, './lib/toggle/toggle.scss'),
    variables: path.join(__dirname, './lib/variables.scss')
  };

  module.exports.plugins = [
    new FixStyleOnlyEntriesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ];
  module.exports.optimization = {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all'
    }
  };
  module.exports.module.rules.push({
    test: /\.*css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  });
}
