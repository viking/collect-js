maria.ElementView.subclass(Collect, 'FormsView', {
  constructor: function(model) {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
    this.appendChild(new Collect.FormsListView(model));
    this.appendChild(new Collect.FormsFormView(model));
  }
});
