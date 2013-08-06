maria.SetView.subclass(Collect, 'FormsListView', {
  constructor: function() {
    maria.SetView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    createChildView: function(form) {
      return new Collect.FormItemView(form);
    }
  }
});
