maria.ElementView.subclass(Collect, 'ProjectsFormView', {
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
