maria.ElementView.subclass(Collect, 'ProjectsView', {
  constructor: function(model) {
    maria.ElementView.apply(this, arguments);
    this.appendChild(new Collect.ProjectsListView(model));
    this.appendChild(new Collect.ProjectsFormView(model));
  }
});
