module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            timeStamp: Date.now(),
            ftpDirectory: "/wwww/htdocs/3rd-rail" //*** change this to path on the server where you're storing static assets for your page
        },
        clean: {
            serve: {
                src: 'serve',
                force: true
            },
            build: {
                src: 'build',
                force: true
            }
        },
        //Copy static files
        copy: {
            serve: {
                files: [
                    {
                        expand: true,
                        cwd: "static",
                        src: ['img/**', 'fonts/**','css/**', 'js/**'],
                        dest: 'serve'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "static",
                        src: ['img/**', 'fonts/**','*.html', 'js/bootstrap.min.js', 'js/responsive-calendar.min.js'],
                        dest: 'build'
                    }
                ]
            },
            markup: {
                files: [
                    {
                        expand: true,
                        cwd: "static/includes",
                        src: ['**'],
                        dest: 'build'
                    }
                ]
            }
        },
        includes: {
            serve: {
                cwd: 'static',
                src: [ '*.html' ],
                dest: 'serve/',
                options: {
                    flatten: true
                }
            },
             build: {
                cwd: 'static',
                src: [ '*.html' ],
                dest: 'build/',
                options: {
                    flatten: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '192.168.0.8',
                livereload: 35731
            },
            livereload: {
                options: {
                    open: true,
                        base: [
                            'serve/'
                        ]
                }
            }
        },
        watch: {
            options: {
                livereload: 35731
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: ['static/**/*.*'],
                tasks: ['make']
            }
        },
        concat: {
            js: {
                src: [['static/js/jquery.history.js', 'static/js/main.js', 'js/ie10-viewport-bug-workaround.js']],  //*** change this to include all your js files
                dest: 'build/js/main.min.js'
            },
            css: {
                src: [['static/css/bootstrap.css', 'static/css/jumbotron.css', 'static/css/carousel.css', 'static/css/responsive-calendar.css', 'static/css/newsfeed.css', 'static/css/main.css']], //*** change this to include all your css files
                dest: 'build/css/main.min.css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            jsmin: {
                files: {
                    'build/js/main.min.js':  ['build/js/main.min.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'build/css/main.min.css': ['build/css/main.min.css']
                }
            }
        },
        'string-replace': {
            jsfiles: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [
                         {
                            pattern: '<script src="js/ie10-viewport-bug-workaround.js"></script>',
                            replacement: ''
                        },
                        {
                            pattern: '<script src="js/jquery.history.js"></script>',
                            replacement: ''
                        },
                        {
                            pattern: 'src="js/main.js"',
                            replacement: 'src="js/main.min.js"'
                        }
                    ]
                }
            },
            cssfiles: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<link href="css/responsive-calendar.css" rel="stylesheet" media="screen">',
                            replacement: ''
                        },
                        {
                            pattern: '<link href="css/newsfeed.css" rel="stylesheet" media="screen">',
                            replacement: ''
                        },
                         {
                            pattern: '<link href="css/bootstrap.css" rel="stylesheet" media="screen">',
                            replacement: ''
                        },
                         {
                            pattern: '<link href="css/jumbotron.css" rel="stylesheet" media="screen">',
                            replacement: ''
                        },
                         {
                            pattern: '<link href="css/carousel.css" rel="stylesheet">',
                            replacement: ''
                        },
                         {
                            pattern: 'href="css/main.css"',
                            replacement: 'href="css/main.min.css"'
                        }
                    ]
                }
            }
        },
        ftpush : {
            ftpserve: {
                auth: {
                    host: 'fitz.com',
                        port: 21,
                        authKey: 'key1'
                },
                src: 'build/',
                dest: 'release.<%=ftpDirectory %>',
                simple: false,
                useList: true
            }

        }
    });



    // Load NpmTasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-ftpush');
    grunt.loadNpmTasks('grunt-git');

    // //////////////////// //
    // REGISTER GRUNT TASKS //
    // //////////////////// //
    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('make', ['clean:serve','copy:serve','includes:serve']);
    grunt.registerTask('serve', ['clean:serve','copy:serve','includes:serve','connect','watch']);

    grunt.registerTask('build', ['clean:build','copy:build','concat:js','uglify:jsmin','concat:css','cssmin:compress',,'includes:build','string-replace:jsfiles','string-replace:cssfiles','ftpush:ftpserve']);

    grunt.registerTask('build-local', ['clean:build','copy:build', 'concat:js','uglify:jsmin','concat:css','cssmin:compress','includes:build','string-replace:jsfiles','string-replace:cssfiles']);
};


























