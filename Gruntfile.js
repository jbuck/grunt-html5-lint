/*
 * grunt-html5-lint
 * https://github.com/matt/grunt-html5-lint
 *
 * Copyright (c) 2013 Matthew Schranz
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function( grunt ) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    html5_lint: {
      dist: {
        options: {
          files: [
            "test/valid/",
            "test/invalid/"
          ],
          ignoreList: [
            {
              // Don't warn on valid docs
              text: "The document is valid HTML5 + ARIA + SVG 1.1 + MathML 2.0 (subject to the utter previewness of this service)."
            },
            {
              text: "Start tag seen without seeing a doctype first. Expected “<!DOCTYPE html>”.",
              htmlFragment: true
            },
            {
              text: "Element “head” is missing a required instance of child element “title”.",
              htmlFragment: true
            },
            {
              text: "Bad value “X-UA-Compatible” for attribute “http-equiv” on element “meta”."
            },
            {
              text: "Warning: The character encoding of the document was not declared."
            },
            {
              text: "Attribute “mozallowfullscreen” not allowed on element “iframe” at this point."
            },
            {
              text: "Attribute “webkitallowfullscreen” not allowed on element “iframe” at this point."
            },
            {
              text: "Attribute “allowfullscreen” not allowed on element “iframe” at this point."
            },
            {
              // Let <style> be in fragments.
              text: "Element “style” not allowed as child of element “body” in this context. (Suppressing further errors from this subtree.)",
              htmlFragment: true
            },
            {
              // Let <li> be in fragments.
              text: "Element “li” not allowed as child of element “body” in this context. (Suppressing further errors from this subtree.)",
              htmlFragment: true
            }
          ]
        }
      }
    }

  });

  // Actually load this plugin"s task(s).
  grunt.loadTasks( "tasks" );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-contrib-clean" );
  grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

  // By default, lint and run all tests.
  grunt.registerTask( "default", [ "jshint", "html5_lint" ] );

};
