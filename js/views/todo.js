var app = app || {};

// Todo item view
// --------------
// the DOM element for a todo item

app.TodoView = Backbone.View.extend({


  tagName: 'li',

  //cach the template function for a single item
  template: _.template($('#item-template').html()),

  // DOM event bindings - controller of the MVC
  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'togglecompleted',
    'click .destroy': 'clear'
  },

  // listen to changes on the model, rerendering
  // one-to-one correspondence between Todo and TodoView.
  // NOTE: the model passed in the arguments hash by AppView
  // is automatically available as this.model
  initialize: function(){
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON() ));

    this.$input = this.$('.edit');

    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();

    return this;
  },

  // controller functions
  //--------------------

  toggleVisible: function(){
    this.$el.toggleClass('hidden', this.isHidden());
  },

  // determine whether item should be hidden
  isHidden: function(){
    var isCompleted = this.model.get('completed');

    var result = (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active');

    return (result);
  },

  // toggle the completed state
  togglecompleted: function(){
    this.model.toggle();
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
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  // end editing on enter
  updateOnEnter: function(e){
    if (e.which === ENTER_KEY ){
      this.close();
    }
  },

  // remove item, destroy model from localstorage, delete view
  clear: function(){
    this.model.destroy();
  }


});


