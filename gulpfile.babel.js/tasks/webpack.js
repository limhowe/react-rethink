import gulp from 'gulp';
import webpack from 'gulp-webpack';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';

import webpackConfig from '../webpack.config';
import config from '../config';

gulp.task('webpack', () => {
  return gulp.src(`${config.root}.build/public/main.js`)
    .pipe(sourcemaps.init())
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.public.bundlePath));
});
