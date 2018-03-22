'use strict';
// 载入组件
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	cleanCss = require('gulp-clean-css'),
	cssUrlVersion = require('gulp-make-css-url-version'),
	rev = require('gulp-rev-append'),
	uglifyJs = require('gulp-uglify'),
	concat = require('gulp-concat'),
	// jshint = require('gulp-jshint'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer');

var path = {
	srcPath: 'src/',    // 源码
	devPath: 'build/',  // 开发环境
	prdPath: 'dist/'    // 生产环境
}

// 编译less文件、并自动注入到浏览器
gulp.task('styles', function() {
	return gulp.src(path.srcPath + 'less/_bootstrap.less')
			   .pipe(less())
			   .pipe(autoprefixer('last 2 version', 'ie 9'))
			   .pipe(concat('bootstrap.css'))
               .pipe(rename({suffix: '.min'}))
			   .pipe(cssUrlVersion())
			   .pipe(gulp.dest(path.devPath + 'css'))
               .pipe(cleanCss({
					advanced: false, // 是否开启高级优化（合并选择器等）
					compatibility: '*', // ie9+兼容模式兼容写法
					keepBreaks: false, // 是否保留换行
					keepSpecialComments: '*' // 保留所有特殊前缀
			    }))
			   .pipe(gulp.dest(path.prdPath + 'css'))
			   .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			   .pipe(browserSync.stream());
});

// 已压缩的javascript插件
gulp.task('jquery', function () {
	return gulp.src(path.srcPath + 'js/vendor/**/*')
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest(path.devPath + 'js'))
			   .pipe(uglifyJs())
			   .pipe(gulp.dest(path.prdPath + 'js'))
			   .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			   .pipe(browserSync.stream());
});

// 压缩javascript文件
gulp.task('scripts', ['jquery'], function(){
	return gulp.src([
				   path.srcPath + 'js/transition.js',
				   // path.srcPath + 'js/alert.js',
				   // path.srcPath + 'js/button.js',
				   // path.srcPath + 'js/carousel.js',
				   path.srcPath + 'js/collapse.js',
				   path.srcPath + 'js/dropdown.js',
				   path.srcPath + 'js/modal.js',
				   path.srcPath + 'js/tooltip.js',
				   // path.srcPath + 'js/popover.js',
				   // path.srcPath + 'js/scrollspy.js',
			       path.srcPath + 'js/tab.js',
				   // path.srcPath + 'js/affix.js',
				   path.srcPath + 'js/datetimepicker.js',
			       path.srcPath + 'js/bootstrapValidator.js',
				   path.srcPath + 'js/bootbox.js',
				   path.srcPath + 'js/sidebar.js',
				   path.srcPath + 'js/dialog.js',
				   path.srcPath + 'js/form.js',
			    ])
			   // .pipe(jshint('src/js/.jshintrc'))
			   // .pipe(jshint.reporter('default'))
			   .pipe(concat('bootstrap.js'))
               .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest(path.devPath + 'js'))
			   .pipe(uglifyJs())
			   .pipe(gulp.dest(path.prdPath + 'js'))
               .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			   .pipe(browserSync.stream());
});

// 处理html文件
gulp.task('html', function() {
	var options = {
		removeComments: true, // 清除html注释
		collapseWhitespace: true, // 压缩html
		collapseBooleanAttributes: true, // 省略布尔属性的值
		removeEmptyAttributes: true, // 删除所有空格作属性值
		removeScriptTypeAttributes: true, // 删除<script>的type
		removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type
		minifyJS: true, // 压缩页面js
		minifyCSS: true // 压缩页面css
	};
	return gulp.src(path.srcPath + '**/*.html')
			   .pipe(rev())
			   .pipe(gulp.dest(path.devPath))
			   .pipe(htmlmin(options))
			   .pipe(gulp.dest(path.prdPath))
			   .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			   .pipe(browserSync.stream());
});

// 处理字体图标
gulp.task('fonts', function() {
	return gulp.src(path.srcPath + 'fonts/*')
			   .pipe(gulp.dest(path.devPath + 'fonts'))
			   .pipe(gulp.dest(path.prdPath + 'fonts'))
			   .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			   .pipe(browserSync.stream());
});

// 压缩图片
gulp.task('images', function() {
  return gulp.src(path.srcPath + 'images/**/*')
			 .pipe(cache(imagemin({
				optimizationLevel: 3,
				progressive: true, // 无损压缩jpg图片
				svgoPlugins: [{removeViewBox: false}], //不移除svg的viewbox属性
				use: [pngquant()], // 使用pngquant深度压缩png图片的imagemin插件
				interlaced: true 
			 })))
			 .pipe(gulp.dest(path.devPath + 'img'))
			 .pipe(gulp.dest(path.prdPath + 'img'))
			 .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 显示错误信息
			 .pipe(browserSync.stream());
});

// doc
gulp.task('doc', function() {
  return gulp.src(path.srcPath + 'doc/**/*')
			 .pipe(gulp.dest(path.devPath + 'doc'))
			 .pipe(gulp.dest(path.prdPath + 'doc'))
			 .pipe(browserSync.stream());
});

// 清理
gulp.task('clean', function() {
	return gulp.src(path.devPath, {read: false})
               .pipe(clean());
});

// 整合任务
gulp.task('build', ['clean'], function() {
    gulp.start('images', 'fonts', 'styles', 'scripts', 'html', 'doc');
});

// server
gulp.task('serve', ['build'], function() {
	browserSync.init({
		server: {
			baseDir:[path.devPath],
		}
	});
	gulp.watch(path.srcPath + 'less/**/*.less', ['styles']);
	gulp.watch(path.srcPath + 'js/**/*.js', ['scripts']);
    gulp.watch(path.srcPath + 'images/**/*', ['images']);
	gulp.watch(path.srcPath + '**/*.html', ['html']);
	gulp.watch(path.srcPath + 'doc/**/*', ['doc']);
	gulp.watch(path.devPath + '**').on("change",browserSync.reload);
});

gulp.task('default', ['serve']);