define(['lib/maria', 'models/form'], function(maria, FormModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AdminFormsInputController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var form = new FormModel();
        form.setName(values.name);
        form.setProjectId(values.project_id);

        maria.on(form, 'validate', this.getModel(), 'onValidateForm');
        if (form.isValid()) {
          this.getModel().add(form);
          view.reset();
        }
        else {
          view.displayErrors(form.getErrors());
        }
      }
    }
  });

  return namespace.AdminFormsInputController;
});
