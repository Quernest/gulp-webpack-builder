import gulp from 'gulp';

const lazyRequireTask = (taskName, path, options = {}) => {
  options.taskName = taskName;

  gulp.task(taskName, (callback) => {
    const task = require(path).call(this, options);

    return task(callback);
  });
};

lazyRequireTask('assets', './tasks/assets', {
  src: 'src/assets/**/*.*',
  dist: 'dist',
});

lazyRequireTask('views', './tasks/views', {
  src: 'src/views/index.pug',
  dist: 'dist',
});

lazyRequireTask('styles', './tasks/styles', {
  src: 'src/styles/**/*.scss',
  dist: 'dist/css',
});

lazyRequireTask('clean', './tasks/clean', {
  manifest: 'manifest',
  dist: 'dist',
});

lazyRequireTask('server', './tasks/server', {
  src: 'dist',
});

lazyRequireTask('webpack', './tasks/webpack/webpack', {
  src: 'src/js/**/*.{js, jsx}',
  dist: 'dist/js',
});

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.*', gulp.series('styles'));
  gulp.watch('src/assets/**/*.*', gulp.series('assets'));
  gulp.watch('src/views/**/*.pug', gulp.series('views'));
  gulp.watch('src/js/**/*.{js,jsx}', gulp.series('webpack'));
});

gulp.task('build', gulp.series(
  'clean', gulp.parallel('assets', 'webpack', 'styles', 'views'))
);

gulp.task('dev', gulp.series(
  'build', gulp.parallel('watch', 'server'))
);
