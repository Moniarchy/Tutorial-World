var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var db = require('./db')

module.exports = function() {
  passport.use( new LocalStrategy (
    function( username, password, done ) {
      var connection = db.get()

      connection.collection( 'users' ).findOne({ username: username }, function( error, user ) {
        if ( error ) { 
          return done( error ); 
        }

        if ( !user ) {
          return done( null, false, { message: 'Incorrect username.' });
        }

        // TODO: This is insecure since password not encrypted, and
        // telling user password is bad. Fix.
        if ( user.password !== password ) {
          return done( null, false, { message: 'Incorrect password.' });
        }

        return done( null, user );
      })
    }
  ));
}