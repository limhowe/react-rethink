import webpack from 'webpack';
import webpackConfig from './webpack.config';

const prodConfig = {
  ...webpackConfig,
  devtool: 'source-map',
  plugins: [
    ...webpackConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};

export default prodConfig;
