'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      app: 'src/adocs',
      dist: 'dist'
    },
    watch: {
      asciidoc: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['src/adocs/**/*.adoc', 'src/stylesheet/**/*.css'],
        tasks: ['asciidoctor:dist']
      }
    },
    asciidoctor: {
      dist: {
        options: {
          showTitle: true,
          showNumberedHeadings: true,
          showToc: true,
          header_footer: true,
          safeMode: 'secure',
          doctype: 'article',
          backend: 'html5'
        },
        files: [{
          expand: true,
          cwd: 'src/adocs',
          src: '**/*.adoc',
          dest: '<%= yeoman.dist %>/',
          rename: function (dest, src) {
            return dest + src.replace('.adoc', '.html');
          }
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/main.html',
          base: '<%= yeoman.dist %>'
        }
      }
    },
    copy: {
      styles: {
        files: [{
          src: 'src/stylesheet/asciidoctor.css',
          dest: '<%= yeoman.dist %>/asciidoctor.css'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: '{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'copy',
    'asciidoctor:dist',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'asciidoctor:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
