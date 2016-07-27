var form = document.querySelector("form");


function addTodo(todoObject) {
  console.log( 'hi') //feteh using method post
  form.addEventListener("submit", function(event) {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
  });
  fetch( '/todos/', { method: 'post', body: JSON.stringify({text:form.elements.value.value}) } )
  .then( function( result ) {
    console.log( result)
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

function todoTemplate( todoObject ) {
  var completedClass = todoObject.completed ? ' completed' : ''
  var checked = todoObject.completed ? 'checked="checked" ' : ''

  return '\
  <div class="todo' + completedClass + '" data-id="' + todoObject._id + '"> \
    <input type="checkbox" ' + checked + '/> \
    <span class="editable-text">' + todoObject.text + '</span> \
    <a href="#" onclick="deleteTodoItem(this)">X</a> \
  </div> \
  '
}

function renderTodos( json ) {
  var todoList = document.getElementsByClassName( 'todo-list' )[ 0 ]

  todoList.innerHTML = json.map( function( todoItem ) {
    return todoTemplate( todoItem )
  }).join('')
}

fetch( '/todos' )
  .then( function( result ) {
    return result.json()
  })
  .then( function( json ) {
    renderTodos( json )
  })