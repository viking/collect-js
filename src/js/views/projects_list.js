maria.SetView.subclass(Collect, 'ProjectsListView', {
  properties: {
    createChildView: function(project) {
      return new Collect.ProjectItemView(project);
    }
  }
});
