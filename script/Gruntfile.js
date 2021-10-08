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
						src: ['../build/**/*'],
					},
				],
			},
			sources: {
				files: [
					{
						force: true,
						src: [
							'./src/client/**/*.js',
							'./src/client/**/*.js.map',
							'./src/client/**/*.d.ts',

							'./src/mixed/**/*.js',
							'./src/mixed/**/*.js.map',
							'./src/mixed/**/*.d.ts',

							'./src/server/**/*.js',
							'./src/server/**/*.js.map',
							'./src/server/**/*.d.ts',

							'./src/assets/**/*.js',
							'./src/assets/**/*.js.map',
							'./src/assets/**.d.ts',

							'./**/*.js.map',
							'!./**/ui/**/*.js',
						],
					},
				],
			},
		},
		copy: {
			assets: {
				cwd: './src/assets',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
					'!**/tsconfig.json',
				],
				dest: '../build/assets/',
				expand: true,
			},
			client: {
				cwd: './src/client',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
					'!**/tsconfig.json',
				],
				dest: '../build/src/client',
				expand: true,
			},
			mixed: {
				cwd: './src/mixed',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
					'!**/tsconfig.json',
				],
				dest: '../build/src/mixed',
				expand: true,
			},
			server: {
				cwd: './src/server',
				src: [
					'**/*',
					'!**/*.ts',
					'!**/*.d.ts',
					'!**/*.ts.example',
					'!**/*.js.map',
					'!**/tsconfig.json',
				],
				dest: '../build/src/server',
				expand: true,
			},
		},
		ts: {
			client: {
				src: ['./src/client/**/*.ts'],
				tsconfig: './src/client/tsconfig.json',
			},
			server: {
				src: ['./src/server/**/*.ts'],
				tsconfig: './src/server/tsconfig.json',
			},
			mixed: {
				src: ['./src/mixed/**/*.ts'],
			},
		},
		uglify: {
			client: {
				src: ['src/client/**/*.js', '!src/client/*.js', 'src/client/*.js'], // source files mask
				dest: '../build/', // destination folder
				expand: true, // allow dynamic building
				ext: '.min.js', // replace .js to .min.js
				toplevel: true,
				rename: function (dest, src) {
					return (
						dest + src.substring(0, src.indexOf('/') + 1) + 'client.min.js'
					);
				},
			},
			server: {
				src: ['src/server/**/*.js'], // source files mask
				dest: '../build/', // destination folder
				expand: true, // allow dynamic building
				ext: '.min.js', // replace .js to .min.js
				toplevel: true,
				rename: function (dest, src) {
					return (
						dest + src.substring(0, src.indexOf('/') + 1) + 'server.min.js'
					);
				},
			},
			mixed: {
				src: ['src/mixed/**/*.js', '!src/mixed/*.js', 'src/mixed/*.js'], // source files mask
				dest: '../build/', // destination folder
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
			client: {
				files: 'src/client/**/*.ts',
				tasks: [
					'forceOn',
					'newer:ts:client',
					'forceOff',
					'newer:copy:client',
					'clean:sources',
				],
				options: {
					interrupt: true,
					force: true,
				},
			},
			server: {
				files: 'src/server/**/*.ts',
				tasks: [
					'forceOn',
					'newer:ts:server',
					'forceOff',
					'newer:copy:server',
					'clean:sources',
				],
				options: {
					interrupt: true,
					force: true,
				},
			},
			mixed: {
				files: 'src/mixed/**/*.ts',
				tasks: [
					'forceOn',
					'newer:ts:mixed',
					'forceOff',
					'newer:copy:mixed',
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
		'ts:client',
		'ts:server',
		'uglify',
		'copy:*',
		'clean:sources',
	]);

	grunt.registerTask('build-dev', [
		'clean:build',
		'ts:client',
		'ts:server',
		'copy:*',
		'clean:sources',
	]);
	grunt.registerTask('clean-web', ['clean:sources']);
	// register at least this one task
	grunt.registerTask('dev', ['build-dev', 'newer:watch']);
};
