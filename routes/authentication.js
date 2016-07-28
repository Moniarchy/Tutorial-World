var express = require('express');
var router = express.Router();

var passport = require( 'passport' );

var redirects = {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: false
}

router.post( '/login', passport.authenticate( 'local', redirects ));

router.get( '/login', function( request, response, next ) {
  response.render( 'auth/login' );
});

module.exports = router;
