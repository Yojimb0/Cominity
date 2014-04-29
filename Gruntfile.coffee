path = require 'path'

module.exports = (grunt) ->

	# grunt.loadNpmTasks 'grunt-autoprefixer'
	grunt.loadNpmTasks 'grunt-concurrent'
	# grunt.loadNpmTasks 'grunt-contrib-jshint'
	# grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	# grunt.loadNpmTasks 'grunt-node-inspector'
	grunt.loadNpmTasks 'grunt-nodemon'
	grunt.loadNpmTasks 'grunt-open'
	# grunt.loadNpmTasks 'grunt-express'


	grunt.initConfig
		# nodemon:
		# 	dev:
		# 		options:
		# 			file: 'server/server.js'
		# 			nodeArgs: ['--debug']
		# 			env:
		# 				PORT: '9000'

		concurrent:
			dev:
				tasks: ['nodemon', 'watch'],
				options:
					logConcurrentOutput: true

		# nodemon:
		# 	dev:
		# 		options:
		# 			file: 'server.js'
		# 			watchedExtensions: ['js', 'json']
		# 			# ignoredFiles: ['node_modules/**', 'dist/**']
		# 			# nodeArgs: ['--debug']
		# 			# delayTime: 1,
		# 			# env:
		# 			# 	PORT: '3000',
		# 			# 	NODE_ENV: 'development'
		# express:
		# 	dev:
		# 		options:
		# 			script: 'server.js'

		# watch:
		# 	options:
		# 		livereload: true				
		# 	express:
		# 		files:  [ 'server.js' ]
		# 		tasks:  [ 'express:dev:stop', 'express' ]
		# 		# options:
		# 			# spawn: false # Without this option specified express won't be reloaded

		# express:
		# 	livereload:
		# 		options:
		# 			server: path.resolve('server/server.js')
		# 			livereload: true
		# 			serverreload: true
		# 			bases: [path.resolve(__dirname, 'server')]
		# 			port: 9001
		# 			hostname: 'localhost'
		# 			delay: 3

		# watch:
		# 	express:
		# 		files: ['server/server.js']
		# 		options:
		# 			livereload: true

		# nodemon:
		# 	dev:
		# 		script: 'server.js'


		# nodemon:
		# 	dev:
		# 		options:
		# 			file: 'app.js'
		# 			nodeArgs: ['--debug']
		# 			env:
		# 				PORT: '3000'
			# dev:
			# 	script: 'server.js'
			# 	options:
			# 		# args: ['dev'],
			# 		# nodeArgs: ['--debug'],
			# 		env:
			# 			PORT: '3000'
			# 		cwd: __dirname
			# 		ignore: ['node_modules/**']
			# 		ext: 'js,coffee'
			# 		watch: ['server']
			# 		delayTime: 1
			# 		callback: (nodemon) ->
			# 			nodemon.on 'log', (event) ->
			# 				console.log event.colour

			# 		# legacyWatch: true

		nodemon:
			dev:
				script: 'server.js'
				options:
					# nodeArgs: ['--debug']
					env:
						PORT: '5455'
					callback: (nodemon) ->
						nodemon.on 'restart', ->
							setTimeout ->
								require('fs').writeFileSync('.grunt/rebooted', 'rebooted')
								return
							, 1000
							return
						nodemon.on 'log', (event) ->
							console.log event.colour
							return


		watch:
			server:
				files: ['.grunt/rebooted']
				options: 
					livereload: true



			


	grunt.registerTask 'default', ['concurrent']







