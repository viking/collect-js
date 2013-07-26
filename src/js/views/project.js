maria.ElementView.subclass(Collect, 'ProjectView', {
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
