/*
 * grunt-html5-lint
 * https://github.com/matt/grunt-html5-lint
 *
 * Copyright (c) 2013 Matthew Schranz
 * Licensed under the MIT license.
 */

 /*global find, cat*/

"use strict";

module.exports = function( grunt ) {

  function isHTMLFragment( filename ) {
    return !( /<html[^>]*\>/m ).test( cat( filename ) );
  }

  var async = require( "async" ),
      html5lint = require( "html5-lint" );

  require( "shelljs/make" );

  grunt.registerMultiTask( "html5_lint", "HTML Linting", function() {
    var ignoreList = this.options().ignoreList || [];

    var q = async.queue(function( htmlFile, cb ) {console.log(htmlFile);
      html5lint( cat( htmlFile ), function( err, messages ) {console.log(err, messages);
        messages.messages.forEach( function( msg ) {
          var ignored = ignoreList.some( function( ignore ) {
            return ignore.text === msg.message && ( !ignore.htmlFragment || ( ignore.htmlFragment && isHTMLFragment( htmlFile ) ) );
          });

          if ( !ignored ) {
            grunt.fail.warn( "Error: " + msg.message + "in " + htmlFile + ":" + msg.lastLine + ":" + msg.lastColumn );
          }
        });

        cb();
      });
    });

    q.push( find( this.options().files ).filter( function( file ) {
      return file.match( /\.html$/ );
    }));
  });

};
