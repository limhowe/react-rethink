import config from './config';
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  entry: [
    `${config.root}public/main.js`
  ],
  output: {
    path: config.public.bundlePath,
    filename: 'bundle.js',
    pathinfo: true
  },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true })
  ],
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json'],
    root: [
      path.resolve('./')
    ],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "./public/sass/_config.scss";',
    includePaths: [path.resolve(__dirname, './public')]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: `${config.root}public`,
      loaders: ['react-hot', 'babel']
    }, {
      test: /(\.css|\.scss)$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
    }]
  }
};
