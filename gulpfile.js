var gulp = require('gulp'),
	htmlmin = require('gulp-html-minifier'),
	server = require('gulp-server-livereload'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

/*
 * DEFAULT
 */
gulp.task('default', ['html-minify', 'compress-js', 'concat-js', 'move-json'], function () {})

/*
 * HTML
 */
gulp.task('html-minify', function() {
  gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

gulp.task('html-minify:watch', function () {
	gulp.watch('./src/*.html', ['html-minify']);
});

/*
 * JAVASCRIPT
 */
gulp.task('compress-js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('concat-js', function() {
  return gulp.src(['./node_modules/particles.js/particles.js', './src/js/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('scripts:watch', function () {
	gulp.watch('./src/js/*.js', ['compress-js', 'concat-js']);
});

/*
 * JSON SOURCE
 */

 gulp.task('move-json', function() {
 	gulp.src('./src/js/particles.json')
 	.pipe(gulp.dest('./dist/scripts/'));
 });

gulp.task('move-json:watch', function () {
	gulp.watch('./src/js/particles.json', ['move-json']);
});

/*
 * SERVER
 */
gulp.task('serve', ['default', 'html-minify:watch', 'scripts:watch', 'move-json:watch'], function () {
	return gulp.src('./dist')
	.pipe(server({
		livereload: true,
		open: true
	}));
});