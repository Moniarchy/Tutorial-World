var express = require('express');
var router = express.Router();

var db = require('../db')


var jsonResponder = function( response ) {
  return function( error, result ) {
    if( error ) {
      response.send( error )
    } else {
      response.send( result )
    }
  }
}

var indexRoute = function( request, response, next ) {
  var connection = db.get()
  var collection = connection.collection( 'todos' );

  collection.find().toArray( jsonResponder( response ) );  
}


router.get( '/', indexRoute );

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

  collection.insert( todo, function( error, result ) {
    if( error ) {
      response.send( { error: error })
    } else {
      response.send( result )
    }
  });
});

router.post( '/', function( request, response, next ) {
  var collection = db.get().collection( 'todos' );
// 
  var todo = {
    text: request.body.text,
    completed: false
  }

  collection.insert( todo, function( error, result ) {
    if( error ) {
      response.send( { error: error })
    } else {
      response.send( { result: 'ok' } )
    }
  });
});

router.get( '/delete', function( request, response, next){
  var collection = db.get().collection( 'todos' );
})

module.exports = router;