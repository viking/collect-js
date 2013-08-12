define(['lib/maria', 'models/project'], function(maria, ProjectModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AdminProjectsFormController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var project = new ProjectModel();
        project.setName(values.name);
        this.getModel().add(project);
        view.reset();
      }
    }
  });

  return namespace.AdminProjectsFormController;
});
