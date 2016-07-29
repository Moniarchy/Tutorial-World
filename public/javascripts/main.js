function requestParameters( data, method ) {
  return {
    method: method,
    body: JSON.stringify( data ),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

function updateTodo( input ) {
  var element = $(input)
  var id = element.parent().parent().data('id')
  var text = element.val()

  fetch( '/todos/' + id, requestParameters({ text: text }, 'put' ) )
    .then( function( result ) {
      var parent = element.parent()
      parent.html()
      parent.text( text )
    })

  element.off( 'focusout' )
  element.off( 'keydown' )
}

function hookInputs() {
  $('span.editable-text').off( 'click' )

  $('span.editable-text').on( 'click', function() {
    var element = $(this)
    var text = element.text()

    element.html( "<input class=\"update-todo-text\" placeholder=\"" + text + "\"/>" )
    $('span.editable-text').off( 'click' )

    $('input.update-todo-text').on( 'focusout', function( event ) {
      updateTodo( this )
    })

    $('input.update-todo-text').on( 'keydown', function( event ) {
      if( event.which === 13 ) {
        updateTodo( this )
      }
    })
  })

}

function checkChanged( checkbox ) {
  var todoItem = checkbox.parentElement
  var todoId = todoItem.attributes[ 'data-id' ].value
  var completed = checkbox.checked

  fetch('/todos/' + todoId, requestParameters({ completed: completed }, 'put' ))
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

  fetch( '/todos/', requestParameters( todoData, 'post' ) )
    .then( function( result ) {
      return result.json()
    })
    .then( function( json ) {
      input.value = ''

      var todoList = document.getElementsByClassName( 'todo-list' )[ 0 ]
      var todoHtml =  new Todo( json ).toHtml() 

      todoList.innerHTML = todoHtml + todoList.innerHTML

      hookInputs()
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

  hookInputs()
}

fetch( '/todos', { credentials: 'include' } )
  .then( function( result ) {
    return result.json()
  })
  .then( function( json ) {
    renderTodos( json )
  })