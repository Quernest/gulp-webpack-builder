import gulp from 'gulp';
import multipipe from 'multipipe';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

module.exports = (options) => () => {
  return multipipe(
    gulp.src(options.src),
    $.if(isDev, $.sourcemaps.init()),
    $.sass(),
    $.autoprefixer(),
    $.if(isDev, $.sourcemaps.write()),
    $.if(!isDev, $.cssnano()),
    gulp.dest(options.dist)).on('error', $.notify.onError()
  );
};
