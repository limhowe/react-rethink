import config from './config';

export default {
  entry: {
    app: [`${config.root}.build/public/main.js`]
  },
  output: {
    path: config.public.bundlePath,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    pathinfo: true
  }
};
