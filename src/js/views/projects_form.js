define([
  'lib/maria',
  'controllers/projects_form',
  'templates/projects_form',
  'route_helper'
], function(maria, ProjectsFormController, ProjectsFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'ProjectsFormView', {
    controllerConstructor: ProjectsFormController,
    template: ProjectsFormTemplate.source,
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

  return namespace.ProjectsFormView;
});
