maria.Controller.subclass(Collect, 'ProjectsFormController', {
  properties: {
    onSubmit: function() {
      var view = this.getView();
      var values = view.getValues();
      var project = new Collect.ProjectModel();
      project.setName(values.name);
      this.getModel().add(project);
      view.reset();
    }
  }
});
