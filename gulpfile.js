const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
    return gulp
        .src(['src/js/**/*.js'])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/js/**/*.js', gulp.parallel('js'));
    gulp.watch('src/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('scss', 'js', 'html', 'watch'));