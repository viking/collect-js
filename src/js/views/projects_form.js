maria.ElementView.subclass(Collect, 'ProjectsFormView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  uiActions: {
    'click input.create': 'onSubmit'
  },

  properties: {
    reset: function() {
      this.find('input').value = '';
    },

    getValues: function() {
      return({name: this.find('input').value});
    },
  }
});
