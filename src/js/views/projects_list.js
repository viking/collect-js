maria.SetView.subclass(Collect, 'ProjectsListView', {
  constructor: function() {
    maria.SetView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  properties: {
    createChildView: function(project) {
      return new Collect.ProjectItemView(project);
    }
  }
});
