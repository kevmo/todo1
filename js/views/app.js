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

    // Element caching
    // this.$() finds els relative to this.$el
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');

    // event bindings
    this.listenTo(app.Todos, 'add', this.addOne);
    this.listenTo(app.Todos, 'reset', this.addAll);
    this.listenTo(app.Todos, 'change:completed', this.filterOne);
    this.listenTo(app.Todos, 'filter', this.filterAll);
    this.listenTO(app.Todos, 'all', this.render);

    app.Todos.fetch();
  },

  // using render to refresh the statistics -- leave
  // the rest of the app alone
  render: function(){
    var completed = app.Todos.completed().length;
    var remaining = app.Todos.remaining();

    if (app.Todos.length){

      this.$main.show();
      this.$footer.show();

      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#' + ( app.TodoFilter || '') + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }

    this.allCheckbox.checked = !remaining;
  },


  // delegated events for creating/clearing items...
  // declarative callbacks
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },

  // business Logic goes in the view
  // -------------------------------
  //

  // add a single todo by creating a view for it,
  // and appending its element to the <ul>
  addOne: function (todo){
    var view = new app.TodoView({ model: todo});
    $('#todo-list').append(view.render().el);
  },

  // add all items in Todos collection at once
  addAll: function(){
    this.$('#todo-list').html('');
    app.Todos.each(this.addOne, this);
  },

  filterOne: function(todo){
    todo.trigger('visible');
  },

  filterAll: function(){
    app.Todos.each(this.filterOne, this);
  },

  // generate attributes for a new todo item
  newAttributes: function(){
    return {
      title: this.$input.val().trim(),
      order: app.Todos.nextOrder(),
      completed: false
    };
  },

  // if you hit return in main input field, create new
  // todo model, persist to localstorage
  createOnEnter: function (event){
    if ( event.which !== ENTER_KEY || !this.$input.val().trim() ){
      return;
    }

    app.Todos.create( this.newAttributes() );
    this.$input.val('');
  },

  // clear all completed, destroy their models
  clearCompleted: function(){
    _.invoke(app.Todos.completed(), 'destroy');
    return false;
  },


  toggleAllComplete: function(){
    var completed = this.allCheckbox.checked;

    app.Todos.each(function(todo){
      todo.save({
        'completed': completed
      });
    });
  }
});
