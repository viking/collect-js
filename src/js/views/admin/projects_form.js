define([
  'lib/maria',
  'controllers/admin/projects_form',
  'templates/admin/projects_form',
  'route_helper'
], function(maria, AdminProjectsFormController, AdminProjectsFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectsFormView', {
    controllerConstructor: AdminProjectsFormController,
    template: AdminProjectsFormTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      reset: function() {
        this.find('input').value = '';
      },

      getValues: function() {
        return({name: this.find('input').value});
      },
    }
  });

  return namespace.AdminProjectsFormView;
});
