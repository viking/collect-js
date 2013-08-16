define(['lib/maria', 'models/project'], function(maria, ProjectModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AdminProjectsFormController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var model = this.getModel();
        var project = new ProjectModel();
        project.setName(values.name);

        maria.on(project, 'validate', model, 'onValidateProject');
        if (project.isValid()) {
          model.add(project);
          view.reset();
        }
        else {
          view.displayErrors(project.getErrors());
        }
      }
    }
  });

  return namespace.AdminProjectsFormController;
});
