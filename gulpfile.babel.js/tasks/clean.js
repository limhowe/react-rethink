import del from 'del';
import gulp from 'gulp';
import config from '../config';

const cleanTask = () => {
  return del(config.buildPath);
};

gulp.task('clean', cleanTask);

export default cleanTask;
