import gulp from 'gulp';
import multipipe from 'multipipe';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev';

module.exports = (options) => () => {
  return multipipe(
    gulp.src(options.src, {since: gulp.lastRun('assets')}),
    $.newer(options.dist),
    $.if(!isDev, $.imagemin([
      $.imagemin.gifsicle({
        interlaced: true,
      }),
      $.imagemin.jpegtran({
        progressive: true,
        arithmetic: true,
      }),
      $.imagemin.optipng({
        optimizationLevel: 5,
      }),
      $.imagemin.svgo({
        plugins: [
          {
            removeViewBox: true,
          },
          {
            cleanupIDs: false,
          },
        ],
      }),
    ])),
    gulp.dest(options.dist)
  );
};
