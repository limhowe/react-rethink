import webpack from 'webpack';
import webpackConfig from './webpack.config';

const devConfig = {
  ...webpackConfig,
  devtool: 'eval',
  entry: [
    ...webpackConfig.entry,
    'webpack-dev-server/client?http://0.0.0.0:3001', // WebpackDevServer host and port
    'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
  ],
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
};

export default devConfig;
