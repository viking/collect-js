define(['lib/maria', 'models/form'], function(maria, FormModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AdminFormsFormController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var form = new FormModel();
        form.setName(values.name);
        form.setProjectId(values.project_id);
        this.getModel().add(form);
        view.reset();
      }
    }
  });

  return namespace.AdminFormsFormController;
});
