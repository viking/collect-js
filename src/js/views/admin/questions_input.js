define([
  'input_view',
  'controllers/admin/questions_input',
  'templates/admin/questions_input'
], function(InputView, AdminQuestionsInputController, AdminQuestionsInputTemplate) {
  var namespace = {};

  InputView.subclass(namespace, 'AdminQuestionsInputView', {
    controllerConstructor: AdminQuestionsInputController,
    template: AdminQuestionsInputTemplate.source,
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      setFormId: function(formId) {
        this.find('input.form_id').value = formId;
      },
    }
  });

  return namespace.AdminQuestionsInputView;
});

