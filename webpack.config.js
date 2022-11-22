const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getFilename = (filetype) => `assets/[name].[contenthash].${filetype}`;

module.exports = (env, { mode }) => {
  const isDev = mode === 'development';

  return {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
      filename: getFilename('js'),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.(png|jp(e*)g|svg|ico|gif)$/,
          use: ['file-loader'],
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.s?css$/i,
          type: 'javascript/auto',
          use: ['style-loader', 'css-loader', 'scoped-css-loader', 'sass-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
    ],
    ...isDev && { devtool: 'source-map' },
  };
};
