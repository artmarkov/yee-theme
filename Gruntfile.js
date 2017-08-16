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
                    'vendor/twbs/bootstrap/js/affix.js',
                    'vendor/bower-asset/bootstrap-switch/dist/js/bootstrap-switch.js',
                    'vendor/bower-asset/icheck/icheck.js',
                ],
                dest: 'dist/js/bootstrap.js'
            },
            adminlte: {
                src: [
                    'src/js/config.js',
                    'src/js/notification.js',
                    'src/js/settings.js',
                    'src/js/modal.js',
                    'src/js/info-box.js',
                    'src/js/dashboard.js',
                    'vendor/almasaeed2010/adminlte/dist/js/app.js',
                    'vendor/almasaeed2010/adminlte/plugins/select2/select2.js',
                    'src/js/application.js'
                ],
                dest: 'dist/js/application.js'
            },
        },
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    //"dist/css/bootstrap.css": "src/less/bootstrap.less",
                    "dist/css/theme.css": "src/less/theme.less"
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    //"dist/css/bootstrap.min.css": "src/less/bootstrap.less",
                    "dist/css/theme.min.css": "src/less/theme.less",
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
                    "dist/js/bootstrap.min.js": ['dist/js/bootstrap.js'],
                    "dist/js/application.min.js": ['dist/js/application.js']
                }
            }
        },
//        copy: {
//            bootstrapSwitchCss: {
//                files: [
//                    {
//                        expand: true,
//                        cwd: 'vendor/bower-asset/bootstrap-switch/dist/css/bootstrap3/',
//                        src: ['**'],
//                        dest: 'dist/css/'
//                    },
//                ],
//            },
//        },
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-image');

    grunt.registerTask('run', ['clean', 'concat', 'less', 'uglify', 'image']);//'copy', 
    grunt.registerTask('default', ['watch']);
};
