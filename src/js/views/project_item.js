define([
  'lib/maria',
  'templates/project_item',
  'route_helper'
], function(maria, ProjectItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'ProjectItemView', {
    controllerConstructor: null,
    template: ProjectItemTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      buildData: function() {
        var model = this.getModel();
        this.find('li').innerHTML = model.getName();
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.ProjectItemView;
});
