import gulp from 'gulp';
import config from '../config';
import runSequence from 'run-sequence';

gulp.task('dev', (cb) => {
  return runSequence('clean', 'babel:public', 'webpack-dev-server', 'nodemon', cb);
});
