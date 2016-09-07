import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { log, PluginError } from 'gulp-util';

import webpackDevConfig from '../webpack.dev.config';
import config from '../config';

export default gulp.task('webpack-dev-server', (cb) => {
  const compiler = webpack(webpackDevConfig);

  new WebpackDevServer(compiler, {
    noInfo: true,
    inline: true,
    contentBase: config.public.bundlePath
  }).listen(3001, 'localhost', (err) => {
    if(err) throw new PluginError('webpack-dev-server', err);
    log('[webpack-dev-server]', 'http://localhost:3001');
    cb();
  });
});
