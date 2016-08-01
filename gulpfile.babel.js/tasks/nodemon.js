import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

import config from '../config';

gulp.task('nodemon', ['babel:server'], () => {
  return nodemon({
    script: config.server.dist,
    watch: config.server.src,
    tasks: ['babel:server']
  });
});
