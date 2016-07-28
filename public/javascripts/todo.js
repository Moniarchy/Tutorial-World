function Todo( attributes ) {
  this.id = attributes._id;
  this.text = attributes.text || 'New Todo';
  this.completed = attributes.completed || false;
}

Todo.prototype.completedClass = function() {
  return this.completed ? ' completed' : ''
}

Todo.prototype.checkedAttribute = function() {
  return this.completed ? ' checked="checked"' : ''
}

Todo.prototype.toHtml = function() {
  return '\
    <div class="todo' + this.completedClass() + '" data-id="' + this.id + '"> \
      <input type="checkbox" ' + this.checkedAttribute()  + ' onchange="checkChanged(this)" /> \
      <span class="editable-text">' + this.text+ '</span> \
      <a href="javascript:void()" onclick="deleteTodoItem(this)">X</a> \
    </div> \
  '
}
