var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var manifest = require('gulp-manifest');

gulp.task( 'browserify', function () {
    return browserify( './src/main.js' )
        .bundle({ debug: true })
        .pipe( source( 'bundle.js' ) )
        .pipe( gulp.dest( './public/js' ) );
});

gulp.task('manifest', function () {
    gulp.src(['public/**'])
      .pipe(manifest({
          hash: true,
          preferOnline: false,
          network: ['http://*', 'https://*', '*'],
          filename: 'test.appcache',
          exclude: ['test.appcache', 'img/default.jpg'],
          fallback: ['img/default.jpg']
      }))
      .pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify', 'manifest']);