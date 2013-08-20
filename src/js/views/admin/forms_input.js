define([
  'input_view',
  'controllers/admin/forms_input',
  'templates/admin/forms_input'
], function(InputView, AdminFormsInputController, AdminFormsInputTemplate) {
  var namespace = {};

  InputView.subclass(namespace, 'AdminFormsInputView', {
    controllerConstructor: AdminFormsInputController,
    template: AdminFormsInputTemplate.source,
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      setProjectId: function(projectId) {
        this.find('input.project_id').value = projectId;
      }
    }
  });

  return namespace.AdminFormsInputView;
});
