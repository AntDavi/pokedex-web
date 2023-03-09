const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;

//Compilando o Sass, adicionando autoprefixed e dandno refresh na pagina
function compilerSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
}

// Tarefa sass
gulp.task('sass', compilerSass);

function libsCss() {
    return gulp.src('css/lib/*.css')
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('css/'))
}

gulp.task('libsCss', libsCss)

//Compilação de todos os arquivos js já com babel em um arquivo apenas
function gulpJs() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

//Tarefa JS
gulp.task('alljs', gulpJs)

//Possibilidade de adicionar diversas bibliotecas externas ao projeto
function libsJs() {
    return gulp.src(['./js/lib/aos.min.js', './js/lib/swiper.min.js' , './js/lib/axios.min.js'])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

//Tarefas bibliotecas
gulp.task('libsJs', libsJs)

//Função do BrowserSync
function browser() {
    browserSync.init({
        server: {
            baseDir: './',
        },
    })
}

//Tarefa do BrowserSync
gulp.task('browser-sync', browser)

//Função do Watch para alterações em sass e html
function watch() {
    gulp.watch('scss/*.scss', compilerSass);
    gulp.watch('css/lib/*.css', libsCss)
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJs);
    gulp.watch('js/lib/*.js', libsJs);
}

//Tarefa do watch
gulp.task('watch', watch)

//Tarefa defaul que executa o watch e o browsersync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'libsCss', 'alljs', 'libsJs'))