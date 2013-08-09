define([
  'lib/maria',
  'templates/projects_list',
  'views/project_item',
  'route_helper'
], function(maria, ProjectsListTemplate, ProjectItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'ProjectsListView', {
    controllerConstructor: null,
    template: ProjectsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(project) {
        return new ProjectItemView(project);
      }
    }
  });

  return namespace.ProjectsListView;
});
