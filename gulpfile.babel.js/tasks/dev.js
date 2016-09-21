import gulp from 'gulp';
import config from '../config';
import runSequence from 'run-sequence';

gulp.task('dev', (cb) => {
  return runSequence('clean', 'download-localisations', 'webpack-dev-server', 'nodemon', cb);
});
