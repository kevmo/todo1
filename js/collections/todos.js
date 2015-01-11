var app = app || {};

//backed by localstorage

// this.filter, this.without, this.last = underscore methods
// that are mixed into Backbone.Collection

var TodoList = Backbone.Collection.extend({

  // which model?
  model: app.Todo,

  // localStorage configuration
  // namespace: "todos-backbone"
  // use bb ls plugin
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  //business logic - filter completed todos - underscore filter fn
  completed: function(){
    return this.filter(function (todo){
      return todo.get('completed');
    });
  },

  // business logic - filter unfinished items
 remaining: function(){
  return this.filter(function (todo){
    return this.without.apply(this, this.completed());
  });
 },

 // business logic: keep todos in sequential order - function
 // for generating new order number
 nextOrder: function(){
   var next;
   if (!this.length){
    next = 1;
   } else {
     next =  this.last().get('order') + 1;
   };
   return next;
 },

 // sort todos by their original insertion order
 comparator: function( todo ){
   return todo.get('order');
 }
});

// FIRE ZE MISSILE

app.Todos = new TodoList();
