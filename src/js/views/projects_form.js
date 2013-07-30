maria.ElementView.subclass(Collect, 'ProjectsFormView', {
  uiActions: {
  },
  properties: {
    buildData: function() {
      $(this.build()).dialog({autoOpen: false});
    },
    open: function() {
      $(this.build()).dialog('open');
    },
    close: function() {
      $(this.build()).dialog('close');
      this.find('input').value = '';
    },
    getValues: function() {
      return({name: this.find('input').value});
    },
  }
});
