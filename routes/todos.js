var express = require('express');
var router = express.Router();

var ALL_TODOS = [
  { id: 1, completed: false, text: "This is a todo" },
  { id: 2, completed: false, text: "This is a todo" },
  { id: 3, completed: true, text: "This is a completed todo" },
  { id: 4, completed: true, text: "This is a completed todo" },
  { id: 5, completed: false, text: "This is a todo" },
  { id: 6, completed: false, text: "This is a todo" },
  { id: 7, completed: false, text: "This is a todo" }
]

function todos() {
  return ALL_TODOS
}

// READ
// GET request to the URI /todos *for all todos*
router.get( '/', function( request, response, next ) {
  response.send( todos() );
});

// GET request to the URI /todos/:TODO_ID
router.get( '/:id', function( request, response, next ) {
  // Want to pick the todo whose ID is :id and return it
  var desiredId = parseInt( request.params.id )

  var element = todos().find( function( element ) {
    return element.id === desiredId
  }) || {}

  response.send( element )
});

// CREATE
// POST request, with data, to the URI /todos

// UPDATE
// PUT request to the URI /todos/:TODO_ID w/ some data

// DELETE
// DELETE request to the URI /todos/:TODO_ID

module.exports = router;
