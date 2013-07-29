maria.ElementView.subclass(Collect, 'ProjectItemView', {
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
