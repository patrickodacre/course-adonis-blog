const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const merge = require('merge2')

const paths = {
  nodePath: 'node_modules',
  stylesPath: 'assets/scss',
  jsPath: 'assets/js'
}

gulp.task('move-icons', function() {
  return gulp
    .src([paths.nodePath + '/feather-icons/dist/icons/*.svg'])
    .pipe(gulp.dest('./public/icons/'))
})

gulp.task('vendor-js', function() {
  const streamOne = gulp
    .src([
      paths.nodePath + '/jquery-slim/dist/jquery.slim.js',
      paths.nodePath + '/bootstrap/dist/js/bootstrap.bundle.js',
      paths.nodePath + '/feather-icons/dist/feather.js',
      paths.nodePath + '/axios/dist/axios.js'
    ])
    .pipe(
      uglify().on('error', function(err) {
        console.log(err)
      })
    )

  const streamTwo = gulp.src([
    paths.nodePath + '/turbolinks/dist/turbolinks.js',
    paths.nodePath + '/stimulus/dist/stimulus.umd.js'
  ])

  return merge(streamOne, streamTwo)
    .pipe(concat('vendor-scripts.min.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('custom-js', function() {
  return gulp
    .src([paths.jsPath + '/ListItem.js', paths.jsPath + '/app.js'])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: ['transform-class-properties']
      })
    )
    .pipe(concat('custom-scripts.js'))
    .pipe(gulp.dest('public'))
    .pipe(
      uglify().on('error', function(err) {
        console.log('Custom JS Error', err)
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public'))
})

gulp.task('styles', function() {
  return gulp
    .src([
      paths.nodePath + '/bootstrap/dist/css/bootstrap.css',
      paths.stylesPath + '/**/*.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public'))
})

gulp.task('watch', function() {
  gulp.watch(paths.stylesPath + '/**/*.scss', ['styles'])
  gulp.watch(paths.jsPath + '/**/*.js', ['custom-js'])
})

gulp.task('default', [
  'watch',
  'vendor-js',
  'styles',
  'custom-js',
  'move-icons'
])
