var gulp = require('gulp');
var injector = require('gulp-inject');
var concatinator = require('gulp-concat');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var less = require('gulp-less');
var bowerMain = require('bower-main');
var bowerJS = bowerMain('js','min.js');
var bowerCSS = bowerMain('css','min.css');
var html2js = require('gulp-html-js-template');

var target_folder = './output/dist';
var vendor_js = bowerJS.minified.concat(bowerJS.minifiedNotFound);
var source_js = [
    './source/plugin.js',
    './source/client_code.js'
];
var fonts = [
    //'../bower_components/font-awesome/fonts/*.*'
];
var assets = [
    './source/assets/*.*',
    './source/assets/**/*.*'
];
var vendor_styles_css = bowerCSS.minified;
var source_styles_less = [
    './source/**/*.less'
];
var templates = './source/templates/templates.html';

var order = [
    'styles/vendor.css',
    'styles/app.css',
    'scripts/vendor.js',
    'templates/templates.js',
    'scripts/app.js'
];
gulp.task('clean', function () {
    return gulp.src(target_folder, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('vendor_scripts', function(){
    return gulp.src(vendor_js)
        .pipe(concatinator('vendor.js'))
        .pipe(gulp.dest(target_folder + '/scripts'));
});
gulp.task('source_scripts', function(){
    return gulp.src(source_js)
        .pipe(concatinator('app.js'))
        .pipe(gulp.dest(target_folder + '/../temp'));
});
gulp.task('fonts', function(){
    return gulp.src(fonts)
        .pipe(gulp.dest(target_folder + '/fonts'));
});
gulp.task('assets', function(){
    return gulp.src(assets)
        .pipe(gulp.dest(target_folder + '/assets'));
});
gulp.task('templates', function() {
    return gulp.src(templates)
        .pipe( html2js({ext: "js"}) )
        .pipe( gulp.dest(target_folder + '/../temp') );
});
gulp.task('vendor_styles_css', function () {
    return gulp.src(vendor_styles_css)
        .pipe(concatinator('vendor.css'))
        .pipe(gulp.dest(target_folder + '/styles'));
});
gulp.task('styles', ['vendor_styles_css'], function () {
    return gulp.src(source_styles_less)
        .pipe(concatinator('app.less'))
        .pipe(less())
        .pipe(concatinator('app.css'))
        .pipe(gulp.dest(target_folder + '/styles'));
});
gulp.task('one_js_source', ['scripts', 'templates'], function(){
    return gulp.src([target_folder + '/../temp/templates.js', target_folder + '/../temp/app.js'])
        .pipe(concatinator('app.js'))
        .pipe(gulp.dest(target_folder + '/scripts'));
});
gulp.task('build', ['templates', 'scripts', 'styles', 'index', 'assets', 'fonts', 'one_js_source']);
gulp.task('scripts', ['vendor_scripts', 'source_scripts']);

var api_endpoints = [];
var backend_url = 'http://188.166.112.194:8080/';

gulp.task('run', ['build', 'watch'], function() {
    var proxies = [];
    for (var i in api_endpoints){
        proxies.push({
            source: '/'+api_endpoints[i],
            target: backend_url + api_endpoints[i]
        })
    }
    gulp.src(target_folder)
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html',
            proxies: proxies
        }));
});
gulp.task('watch', function(){
    gulp.watch(source_js, ['one_js_source']);
    gulp.watch(templates, ['templates', 'index', 'one_js_source']);
    gulp.watch(source_styles_less, ['styles', 'index']);
});
gulp.task('index',['templates', 'scripts', 'styles'], function () {
    var target = gulp.src('./source/index.html');

    var sources = gulp.src(order, {read: false, cwd: target_folder});

    return target.pipe(injector(sources))
        .pipe(gulp.dest(target_folder));
});