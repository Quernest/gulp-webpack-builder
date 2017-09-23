import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';

const $ = gulpLoadPlugins();

module.exports = (options) => (callback) => {
  return gulp.src(options.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError(),
    }))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(options.dist)).on('data', () => callback());
};
