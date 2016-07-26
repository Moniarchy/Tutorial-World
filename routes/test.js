var express = require('express');
var router = express.Router();

var db = require('../db')

router.get( '/', function( request, response, next ) {
  var collection = db.get().collection( 'todos' );

  collection.find().toArray( function( error, todos ) {
    response.send( todos );
  });
});

router.get( '/add', function( request, response, next ) {
  var collection = db.get().collection( 'todos' );

  var todo = {
    completed: false,
    text: 'This is a test'
  }

  collection.insert( todo, function( error, result ) {
    if( error ) {
      response.send( { error: error })
    } else {
      response.send( result )
    }
  });
});

module.exports = router;