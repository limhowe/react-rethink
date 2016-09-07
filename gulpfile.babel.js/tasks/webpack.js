import gulp from 'gulp';
import webpack from 'gulp-webpack';

import webpackConfig from '../webpack.prod.config';
import config from '../config';

gulp.task('webpack', () => {
  return gulp.src(`${config.root}.build/public/main.js`)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.public.dist));
});
