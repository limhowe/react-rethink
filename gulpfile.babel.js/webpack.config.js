import config from './config';
import webpack from 'webpack';

export default {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    `${config.root}public/main.js`
  ],
  output: {
    path: config.public.bundlePath,
    filename: 'bundle.js',
    pathinfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: `${config.root}public`,
      loaders: ['react-hot', 'babel']
    }]
  }
};
