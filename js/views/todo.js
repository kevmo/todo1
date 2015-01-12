var app = app || {};

// Todo item view
// --------------
// the DOM element for a todo item

app.TodoView = Backbone.View.extend({


  tagName: 'li',

  //cach the template function for a single item
  template: _.template($('#item-template').html()),

  // DOM event bindings
  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  }

})