define([
  'lib/maria',
  'controllers/admin/questions_input',
  'templates/admin/questions_input',
  'route_helper',
], function(maria, AdminQuestionsInputController, AdminQuestionsInputTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminQuestionsInputView', {
    controllerConstructor: AdminQuestionsInputController,
    template: AdminQuestionsInputTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      _formId: null,

      setFormId: function(formId) {
        this._formId = formId;
      },

      reset: function() {
        this.find('input.name').value = '';
        this.find('select.type').selectedIndex = 0;
        this.find('input.prompt').value = '';
      },

      getValues: function() {
        var type = this.find('select.type');
        return({
          name: this.find('input.name').value,
          type: type.options[type.selectedIndex].value,
          prompt: this.find('input.prompt').value,
          form_id: this._formId
        });
      },
    }
  });

  return namespace.AdminQuestionsInputView;
});

