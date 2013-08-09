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
        var a = this.find('a');
        a.innerHTML = model.getName();
        a.setAttribute('href', this.urlFor('/projects/'+model.getId()));
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.ProjectItemView;
});
