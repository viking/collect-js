maria.ElementView.subclass(Collect, 'ProjectItemView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    buildData: function() {
      var model = this.getModel();
      this.find('li').innerHTML = model.getName();
    },
    update: function() {
      this.buildData();
    }
  }
});
