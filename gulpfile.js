const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug  = require('gulp-pug'),
      browserSync = require('browser-sync'),
      htmlbeautify = require('gulp-html-beautify');

const PATH = {
  _: function(addPath){
    return addPath;
  },
  SRC: () => PATH._('src/'),
  DIST: () => PATH._('dist/'),
  COMP: () => PATH._(PATH.SRC() + 'components/'),
  TEMP: () => PATH._(PATH.SRC() + 'template/'),
  STYLES: () => PATH._(PATH.TEMP() + 'styles/'),
  CSS: () => PATH._(PATH.STYLES() + 'css/'),
  SASS: () => PATH._(PATH.STYLES() + 'sass/'),
  SCRIPTS: () => PATH._(PATH.TEMP() + 'scripts/'),
  JS: () => PATH._(PATH.SCRIPTS() + 'js/'),
  PUG: () => PATH._(PATH.TEMP() + 'markup/'),
};




gulp.task('sass', function(){
  return gulp.src(PATH.SASS() + '**/*.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(PATH.CSS()))
    .pipe(browserSync.stream());
})

gulp.task('pug-component', () => {
  return gulp.src(PATH.COMP() + '/**/*.pug')
    .pipe(pug({
      
    }))
    .pipe(htmlbeautify({"indentSize": 2}))
    .pipe(gulp.dest(function(file){ return file.base; }));
});

gulp.task('pug-page', () => {
  return gulp.src(PATH.PUG() + 'pages/**/*.pug')
    .pipe(pug({
      
    }))
    .pipe(gulp.dest(PATH.SRC()));
});

gulp.task('watch', function(){
  browserSync.init({
    server: PATH.SRC()
  });
  gulp.watch(PATH.SASS() + '**/*.sass', gulp.series('sass'));
  gulp.watch(PATH.PUG() + '**/*.pug', gulp.parallel('pug-page')).on('change', browserSync.reload);
  gulp.watch(PATH.COMP() + '**/*.pug', gulp.parallel('pug-component')).on('change', browserSync.reload);
  gulp.watch(PATH.JS() + '**/*.js').on('change', browserSync.reload);
})