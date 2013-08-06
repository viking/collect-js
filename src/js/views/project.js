maria.ElementView.subclass(Collect, 'ProjectView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    buildData: function() {
      var model = this.getModel();
      this.find('h1').innerHTML = model.getName();
    },
    update: function() {
      this.buildData();
    }
  }
});
