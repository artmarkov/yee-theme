module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        watch: {
            files: ["src/less/*.less", "dist/js/app.js"],
            tasks: ["less", "uglify"]
        },
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    "dist/css/admin.css": "src/less/admin.less"
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    "dist/css/admin.min.css": "src/less/admin.less",
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: 'some'
            },
            my_target: {
                files: {
                    "dist/js/app.min.js": ['dist/js/admin.js']
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

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-image');

    grunt.registerTask('default', ['watch']);
};
