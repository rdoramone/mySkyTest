import { src, dest, watch, task, parallel } from 'gulp';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const paths = {
	root: 'dist',
	html: {
		src: 'src/*.html',
		dist: 'dist/'
	},
  styles: {
		src: 'src/assets/sass/**/*.scss',
    dist: 'dist/assets/css/'
  },
  script: {
    src: 'src/assets/js/*.js',
    dist: 'dist/assets/js/'
	},
	plugins: {
		src: 'src/assets/js/plugins/*.js',
    dist: 'dist/assets/js/plugins/'
	},
	fonts: {
		src: 'src/assets/fonts/**/*.{eot,svg,ttf,woff}',
    dist: 'dist/assets/fonts/'
	},
	img: {
		src: 'src/assets/img/*.{jpg,png,gif,svg}',
    dist: 'dist/assets/img/'
	}
};

const configServer = {
	browser: ['chrome'],
	logPrefix : 'DEV', 
	notify: true,
	open: true,
	port: 3000,
	server: {
		baseDir: paths.root,
		index: 'index.html'
	},
	files: [paths.root, `${paths.root}/index.html`]
};

task('html', () => {
	return src(paths.html.src)
		.pipe(dest(paths.html.dist))
});

task('img', () => {
	return src(paths.img.src)
		.pipe(dest(paths.img.dist))
});

task('fonts', () => {
	return src(paths.fonts.src)
		.pipe(dest(paths.fonts.dist));
});

task('styles', () => {
	return src(paths.styles.src)
		.pipe(sass())
		.pipe(rename({
			basename: 'style',
			suffix: '.min'
		}))
		.pipe(dest(paths.styles.dist))
});

task('script', () => {
	return src(paths.script.src)
		.pipe(uglify())
		.pipe(rename({
			basename: 'bundle',
			suffix: '.min'
		}))
		.pipe(dest(paths.script.dist));
});

task('plugins', () => {
	return src(paths.plugins.src)
		.pipe(uglify())
		.pipe(rename({
			basename: 'plugins',
			suffix: '.min'
		}))
		.pipe(dest(paths.plugins.dist));
});

task('browserSyncTask', () => browserSync(configServer));

task('watcher' , () => {
	watch(paths.html.src, { ignoreInitial: false }, task('html'));
	watch(paths.styles.src, { ignoreInitial: false }, task('styles'));
	watch(paths.plugins.src, { ignoreInitial: false }, task('plugins'));
	watch(paths.script.src, { ignoreInitial: false }, task('script'));
	watch(paths.fonts.src, { ignoreInitial: false }, task('fonts'));
	watch(paths.img.src, { ignoreInitial: false }, task('img'));
	browserSync.reload();
});

task('default', parallel(['watcher', 'browserSyncTask']));
