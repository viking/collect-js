define([
  'lib/maria',
  'controllers/forms_form',
  'templates/forms_form',
  'route_helper',
], function(maria, FormsFormController, FormsFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'FormsFormView', {
    controllerConstructor: FormsFormController,
    template: FormsFormTemplate.source,
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

  return namespace.FormsFormView;
});
