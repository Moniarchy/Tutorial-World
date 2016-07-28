var express = require('express');
var router = express.Router();
var passport = require( 'passport' );

var db = require( '../config/db' );


router.get( '/register', function( request, response ) {
  response.render( 'auth/register')
});

router.post( '/register', function( request, response ) {
  // TODO: we should really be validating...
  var connection = db.get()

  var user = request.body

  // TODO: Check that this is a new email address!!!!
  connection.collection( 'users' ).insert( user, function( error, result ) {
    if( error ) {
      // TODO: use user data in form to re-populate fields
      response.render( '/auth/register', user )
    } else {
      passport.authenticate( 'local' )( request, response, function() {
        response.redirect( '/' );
      })
    }
  });
})

router.get( '/login', function( request, response ) {
  response.render( 'auth/login' );
});

router.post( '/login', passport.authenticate( 'local'), function( request, response ) {
  response.redirect( '/' )
});


router.get( '/logout', function( request, response ) {
  request.logout();
  response.redirect( '/auth/login' );
})

module.exports = router;
