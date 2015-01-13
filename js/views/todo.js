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
  },

  // listen to changes on the model, rerendering
  // one-to-one correspondence between Todo and TodoView.
  // NOTE: the model passed in the arguments hash by AppView
  // is automatically available as this.model
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON() ));
    this.$input = this.$('.edit');
    return this;
  },

  // switch into 'editing' mode, displaying input field
  edit: function(){
    this.$el.addClass('editing');
    this.$input.focus();
  },

  // close 'editing' mode
  close: function(){
    var value = this.$input.val().trim();

    if (value){
      this.model.save({ title: value});
    }

    this.$el.removeClass('editing');
  },

  // end editing on enter

  updateOnEnter: function(e){
    if (e.which === ENTER_KEY ){
      this.close();
    }
  }
});


