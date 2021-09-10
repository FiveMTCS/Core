module.exports = function (grunt) {
	grunt.initConfig({
		// define source files and their destinations
		clean: {
			options: {
				force: true,
			},
			build: {
				files: [
					{
						force: true,
						src: ['../build/src/**/*', '../build/assets/**/*'],
					},
				],
			},
			sources: {
				files: [
					{
						force: true,
						src: [
							'./src/src/**/*.js',
							'./src/src/**/*.js.map',
							'./src/assets/**/*.js',
							'./src/assets/**/*.js.map',
							'./**/*.js.map',
							'./src/src/**/*.d.ts',
							'./src/assets/**.d.ts',
							'!./**/ui/**/*.js',
						],
					},
				],
			},
		},
		copy: {
			files: {
				cwd: './src/assets',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
				],
				dest: '../build/assets/',
				expand: true,
			},
			sources: {
				cwd: './src/src',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
				],
				dest: '../build/src/',
				expand: true,
			},
		},
		ts: {
			options: {
				target: 'es6',
				module: 'commonjs',
				declaration: false,
				strict: true,
				moduleResolution: 'node',
				types: ['@types/node', '@citizenfx/client'],
				esModuleInterop: true,
				skipLibCheck: true,
				forceConsistentCasingInFileNames: true,
			},
			files: {
				src: ['./src/**/*.ts', '!./src/web/**/*.ts'],
			},
		},
		uglify: {
			client: {
				src: [
					'src/src/core/**/cli_*.js',
					'src/src/**/cli_*.js',
					'!src/src/cli_*.js',
					'src/src/cli_*.js',
				], // source files mask
				dest: '../build/src/', // destination folder
				expand: true, // allow dynamic building
				ext: '.min.js', // replace .js to .min.js
				toplevel: true,
				rename: function (dest, src) {
					return (
						dest + src.substring(0, src.indexOf('/') + 1) + 'cli_code.min.js'
					);
				},
			},
			server: {
				src: ['src/src/**/srv_*.js'], // source files mask
				dest: '../build/src/', // destination folder
				expand: true, // allow dynamic building
				ext: '.min.js', // replace .js to .min.js
				toplevel: true,
				rename: function (dest, src) {
					return (
						dest + src.substring(0, src.indexOf('/') + 1) + 'srv_code.min.js'
					);
				},
			},
			mixed: {
				src: [
					'src/src/**/mixed_*.js',
					'!src/src/mixed_*.js',
					'src/src/mixed_*.js',
				], // source files mask
				dest: '../build/src/', // destination folder
				expand: true, // allow dynamic building
				ext: '.min.js', // replace .js to .min.js
				toplevel: true,
				rename: function (dest, src) {
					return (
						dest + src.substring(0, src.indexOf('/') + 1) + 'mixed_code.min.js'
					);
				},
			},
		},
		watch: {
			js: {
				files: 'src/src/**/*.ts',
				tasks: [
					'forceOn',
					'newer:ts',
					'forceOff',
					'newer:copy:sources',
					'clean:sources',
				],
				options: {
					interrupt: true,
					force: true,
				},
			},
		},
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-ts');

	grunt.registerTask('forceOn', 'turns the --force option ON', function () {
		if (!grunt.option('force')) {
			grunt.config.set('forceStatus', true);
			grunt.option('force', true);
		}
	});

	grunt.registerTask('forceOff', 'turns the --force option Off', function () {
		if (grunt.config.get('forceStatus')) {
			grunt.option('force', false);
		}
	});

	// register at least this one task
	grunt.registerTask('build', [
		'clean:build',
		'ts',
		'uglify',
		'copy:files',
		'clean:sources',
	]);

	grunt.registerTask('build-dev', [
		'clean:build',
		'ts',
		'copy:sources',
		'copy:files',
		'clean:sources',
	]);
	grunt.registerTask('clean-web', ['clean:sources']);
	// register at least this one task
	grunt.registerTask('dev', ['build-dev', 'newer:watch']);
};
