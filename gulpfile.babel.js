import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import copy from 'gulp-copy';
import webserver from 'gulp-webserver';

const bundler = browserify({
  entries: ['src/index.js'],
  extensions: ['.jsx', '.js'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

bundler.transform(babelify);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('index.js'))
    .pipe(gulp.dest('build'));
}

gulp.task('babel', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

gulp.task('copy', () => {
  gulp.src('src/index.html')
    .pipe(copy('build', {
      prefix: 1
    }));
});

gulp.task('sass', () => {
  gulp.src('src/styles/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/index.html', ['copy']);
});

gulp.task('server', () => {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', ['copy', 'babel', 'sass', 'server', 'watch']);
