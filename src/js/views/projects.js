define([
  'lib/maria',
  'templates/projects',
  'views/projects_list',
  'route_helper'
], function(maria, ProjectsTemplate, ProjectsListView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'ProjectsView', {
    controllerConstructor: null,
    template: ProjectsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
      this.appendChild(new ProjectsListView(model));
    }
  });

  return namespace.ProjectsView;
});
