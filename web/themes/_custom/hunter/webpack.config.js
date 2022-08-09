const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { env } = require('process');

module.exports = {
  mode: 'production',
  entry: {
    global: [
      './src/js/main.js',
      './src/scss/main.scss'
    ],
    // ckeditor: [
    //   './src/scss/ckeditor.scss'
    // ],
    // ckeditorAccordionOverrides: [
    //   './src/js/ckeditor-accordion-overrides.js',
    //   './src/scss/ckeditor-accordion-overrides.scss'
    // ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devtool: env.production ? false : 'source-map',
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /fa-(.*)\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: 'font-awesome/[name].[ext]',
          outputPath: 'fonts',
          publicPath: '../fonts'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
          publicPath: '../fonts'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: [
          path.resolve(__dirname, './node_modules'),
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
            outputPath: 'images',
            publicPath: '../images',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 }},
          { loader: 'postcss-loader', options: { sourceMap: true } }, // For autoprefixer
          { loader: 'sass-loader', options: { sourceMap: true, implementation: require('sass') } }
        ]
      },
    ]
  },
  plugins: [
    new ESLintPlugin(),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.json'),
      context: path.resolve(__dirname, 'src/scss'),
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      emitErrors: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      // chunkFilename: 'css/[id].css'
    }),
  ],
  externals: {
    jquery: 'jQuery'
  }
};
