maria.ElementView.subclass(Collect, 'ProjectItemView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    buildData: function() {
      var model = this.getModel();
      var a = this.find('a');
      a.innerHTML = model.getName();
      a.setAttribute('href', this.urlFor('/projects/'+model.getId()));
    },
    update: function() {
      this.buildData();
    }
  }
});
