maria.ElementView.subclass(Collect, 'FormItemView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    buildData: function() {
      var model = this.getModel();
      var li = this.find('li');
      li.innerHTML = model.getName();
    },
    update: function() {
      this.buildData();
    }
  }
});
