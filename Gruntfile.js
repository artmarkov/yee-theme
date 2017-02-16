module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        watch: {
            files: ["src/less/*.less", "src/js/*.js"],
            tasks: ["concat", "less", "uglify"]
        },
        clean: {
            dist: 'dist'
        },
        concat: {
            bootstrap: {
                src: [
                    'vendor/twbs/bootstrap/js/transition.js',
                    'vendor/twbs/bootstrap/js/alert.js',
                    'vendor/twbs/bootstrap/js/button.js',
                    //'vendor/twbs/bootstrap/js/carousel.js',
                    'vendor/twbs/bootstrap/js/collapse.js',
                    'vendor/twbs/bootstrap/js/dropdown.js',
                    'vendor/twbs/bootstrap/js/modal.js',
                    'vendor/twbs/bootstrap/js/tooltip.js',
                    'vendor/twbs/bootstrap/js/popover.js',
                    'vendor/twbs/bootstrap/js/scrollspy.js',
                    'vendor/twbs/bootstrap/js/tab.js',
                    'vendor/twbs/bootstrap/js/affix.js'
                ],
                dest: 'dist/js/bootstrap.js'
            },
            admin: {
                src: [
                    'src/js/admin.js'
                ],
                dest: 'dist/js/admin.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    "dist/css/theme.css": "src/less/bootstrap.less"
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    "dist/css/theme.min.css": "src/less/bootstrap.less",
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: 'some'
            },
            javascript: {
                files: {
                    "dist/js/admin.min.js": ['dist/js/admin.js'],
                    "dist/js/bootstrap.min.js": ['dist/js/bootstrap.js']
                }
            }
        },
        image: {
            dynamic: {
                files: [{
                        expand: true,
                        cwd: 'src/img/',
                        src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                        dest: 'dist/img/'
                    }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-image');

    grunt.registerTask('run', ['clean', 'concat', 'less', 'uglify', 'image']);
    grunt.registerTask('default', ['watch']);
};
