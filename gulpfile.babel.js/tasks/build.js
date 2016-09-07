import gulp from 'gulp';

import config from '../config';
import runSequence from 'run-sequence';

gulp.task('build', (cb) => {
  return runSequence('clean', 'babel:server', 'webpack', cb);
});
