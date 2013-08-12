define([
  'lib/maria',
  'controllers/admin/forms_form',
  'templates/admin/forms_form',
  'route_helper',
], function(maria, AdminFormsFormController, AdminFormsFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormsFormView', {
    controllerConstructor: AdminFormsFormController,
    template: AdminFormsFormTemplate.source,
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

  return namespace.AdminFormsFormView;
});
