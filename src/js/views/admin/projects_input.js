define([
  'input_view',
  'controllers/admin/projects_input',
  'templates/admin/projects_input'
], function(InputView, AdminProjectsInputController, AdminProjectsInputTemplate) {
  var namespace = {};

  InputView.subclass(namespace, 'AdminProjectsInputView', {
    controllerConstructor: AdminProjectsInputController,
    template: AdminProjectsInputTemplate.source,
    uiActions: {
      'click input.create': 'onSubmit'
    }
  });

  return namespace.AdminProjectsInputView;
});
