import gulp from 'gulp';
import multipipe from 'multipipe';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

module.exports = (options) => () => {
  return multipipe(
    gulp.src(options.src),
    $.pug(),
    gulp.dest(options.dist)
  );
};
