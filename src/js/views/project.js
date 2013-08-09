define([
  'lib/maria',
  'templates/project',
  'route_helper'
], function(maria, ProjectTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'ProjectView', {
    controllerConstructor: null,
    template: ProjectTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      buildData: function() {
        var model = this.getModel();
        this.find('span.name').innerHTML = model.getName();
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.ProjectView;
});
