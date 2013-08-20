define([
  'lib/maria',
  'controllers/admin/forms_input',
  'templates/admin/forms_input',
  'route_helper',
], function(maria, AdminFormsInputController, AdminFormsInputTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormsInputView', {
    controllerConstructor: AdminFormsInputController,
    template: AdminFormsInputTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      _projectId: null,

      setProjectId: function(projectId) {
        this._projectId = projectId;
      },

      reset: function() {
        this.find('input').value = '';
      },

      getValues: function() {
        return({name: this.find('input').value, project_id: this._projectId});
      },
    }
  });

  return namespace.AdminFormsInputView;
});
