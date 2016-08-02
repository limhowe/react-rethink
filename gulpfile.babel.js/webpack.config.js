import config from './config';

export default {
  entry: {
    app: [`${config.root}public/main.js`]
  },
  output: {
    path: config.public.bundlePath,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    pathinfo: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};
