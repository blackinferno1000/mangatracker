const gulp = require('gulp');
const cache = require('gulp-cached');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

const sassTask = (done) => {
    gulp.src('./scss/style.scss')
    .pipe(cache('sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./hosted/'));

    done();
};

const jsTask = (done) => {
    gulp.src(['./client/login/client.js','./client/app/tracker.js'])
    .pipe(cache('babel'))
    .pipe(babel({
        presets: ['@babel/preset-env', '@babel/preset-react']
    }))
    .pipe(gulp.dest('./hosted/'));

    done();
};

const lintTask = (done) => {
    gulp.src(['./server/controllers*.js', './server/middleware*.js', './server/models*.js', './server/*.js'])
    .pipe(eslint({ fix: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

    done();
};

const watch = () => {
    gulp.watch('./scss/style.scss', sassTask);
    gulp.watch(['./client/login/*.js','./client/app/*.js'], jsTask);

    nodemon({
        script: './server/app.js',
        ignore: ['node_modules/', 'scss/', 'client/'],
        ext: 'js html css handlebars'
    })
}

module.exports.build = gulp.parallel(sassTask, jsTask, lintTask);
module.exports.watch = watch;