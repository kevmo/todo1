var app = app || {};

// The Application
// ---------------
// the top level of the UI

// the element controller pattern: two views
// 1 - a collection of items -- AppView
// 2 - each individual items -- TodoView

app.AppView = Backbone.View.extend({

  // bind to existing HTML skeleton
  el: "#todoapp",

  // statstemplate
  statsTemplate: _.template( $('#stats-template').html()),

  // at initialization, we bind to the relevant events on the Todos
  // collection, when items are added or changed
  initialize: function(){
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);
  },

  // add a single todo by creating a view for it,
  // and appending its element to the <ul>

  addOne: function (todo){
    var view = new app.TodoView({ model: todo});
    $('#todo-list').append(view.render().el)
  },

  // add all items in Todos collection at once

  addAll: function(){
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this)
  }
});
