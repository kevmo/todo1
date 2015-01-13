var Workspace = Backbone.Router.extend({

  routes: {
    '*filter': 'setFilter',
  },

  setFilter: function(param){
    //set current filter
    window.app.Todos.trigger('filter');
  }
});

app.TodoRouter = new Workspace();
Backbone.history.start();