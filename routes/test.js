var express = require('express');
var router = express.Router();

var db = require('../db')

router.get( '/', function( request, response, next ) {
  var connection = db.get()
  var collection = connection.collection( 'todos' );

  collection.find().toArray( function( error, databaseQueryResult ) {
    response.send( databaseQueryResult );
  });
});

router.get( '/add', function( request, response, next ) {
  var collection = db.get().collection( 'todos' );

  var todo = {
    completed: false,
    text: 'This is a test'
  }
  var todo2 = {
    completed: true,
    text: 'What the ever loving fuck?'
  }
  var todo3 = {
    completed: true,
    text: 'Nope?'
  }

  collection.insert( todo3, function( error, result ) {
    if( error ) {
      response.send( { error: error })
    } else {
      response.send( result )
    }
  });
});

router.post( '/', function( request, response, next ) {
  console.log( request.params )
});

router.get( '/delete', function( request, response, next){
  var collection = db.delete().collection( 'todos' );

})

module.exports = router;