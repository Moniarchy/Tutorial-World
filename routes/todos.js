var express = require('express');
var router = express.Router();
var ObjectId = require( 'objectid' )

var db = require( '../db' );

// READ
// GET request to the URI /todos *for all todos*
router.get( '/', function( request, response, next ) {
  var collection = db.get().collection( 'todos' )

  collection.find().toArray( function( error, todoResult ) {
    response.send( todoResult);
  })
});

// GET request to the URI /todos/:TODO_ID
router.get( '/:id', function( request, response, next ) {
  var collection = db.get().collection( 'todos' )

  collection.findOne({ _id: ObjectId( request.params.id  )}, function( error, todoResult ) {
    if( error ) {
      response.send( error )
    } else {
      response.send( todoResult );
    }
  })

});

// CREATE
// POST request, with data, to the URI /todos
router.post( '/', function( request, response, next ) {
  var collection = db.get().collection( 'todos' )

  var todo = {
    completed: false,
    text: request.body.text
  }

  collection.insert( todo, function( error, result ) {
    if( error ) {
      response.send( error ) 
    } else {
      response.send( result )
    }
  });
});

// UPDATE
// PUT request to the URI /todos/:TODO_ID w/ some data
router.put( '/:id', function( request, response, next ) {
  var collection = db.get().collection( 'todos' )

  var selector = { _id: ObjectId( request.params.id ) }
  var updateFields = { $set: request.body }

  collection.updateOne( selector, updateFields, function( error, result ) {
    if( error ) {
      response.send( error ) 
    } else {
      response.send( result )
    }
  })
});

// DELETE
// DELETE request to the URI /todos/:TODO_ID
router.delete( '/:id', function( request, response, next ) {
  var collection = db.get().collection( 'todos' )

  var selector = { _id: ObjectId( request.params.id ) }

  collection.deleteOne( selector, function( error, result ) {
    if( error ) {
      response.send( error ) 
    } else {
      response.send( result )
    }
  })
});

module.exports = router;
