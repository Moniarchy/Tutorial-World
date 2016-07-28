function postTodo( data ) {
  return {
    method: 'post',
    body: JSON.stringify( data ),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

function updateTodo( data ) {
  return {
    method: 'put',
    body: JSON.stringify( data ),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}


function checkChanged( checkbox ) {
  var todoItem = checkbox.parentElement
  var todoId = todoItem.attributes[ 'data-id' ].value
  var completed = checkbox.checked

  fetch('/todos/' + todoId, updateTodo({ completed: completed }))
    .then( function( result ) {
      if( completed ) {
        todoItem.setAttribute( 'class', 'todo completed' )
      } else {
        todoItem.setAttribute( 'class', 'todo' )
      }
    })
}

function addTodo() {
  var input = document.querySelector( '.add-todo input' )
  var todoData = { text: input.value }

  fetch( '/todos/', postTodo( todoData) )
    .then( function( result ) {
      return result.json()
    })
    .then( function( json ) {
      input.value = ''

      var todoList = document.getElementsByClassName( 'todo-list' )[ 0 ]
      var todoHtml =  new Todo( json ).toHtml() 

      todoList.innerHTML = todoHtml + todoList.innerHTML
    })
}

function removeTodo( todoId ) {
  var selector = 'div[data-id="' + todoId + '"]'
  document.querySelector( selector ).remove()
}

function deleteTodoItem( link ) {
  var todoId = link.parentElement.attributes[ 'data-id' ].value
  
  fetch( '/todos/' + todoId, { method: 'delete' })
    .then( function( result ) {
      removeTodo( todoId )
    })
}

function renderTodos( json ) {
  var todoList = document.getElementsByClassName( 'todo-list' )[ 0 ]

  todoList.innerHTML = json.map( function( todoItem ) {
    return new Todo( todoItem ).toHtml()
  }).join('')
}

fetch( '/todos', { credentials: 'include' } )
  .then( function( result ) {
    return result.json()
  })
  .then( function( json ) {
    renderTodos( json )
  })