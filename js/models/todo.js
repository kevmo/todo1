var app = app || {};


app.Todo = Backbone.Model.extend({
  // defaults ensure keys exist
  defaults: {
    title: '',
    completed: false
  },

  //business logic function
  toggle: function(){
    this.completed = this.save({
      completed: !this.get('completed')
    });
  }
});