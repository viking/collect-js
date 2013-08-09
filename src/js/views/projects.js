define([
  'lib/maria',
  'templates/projects',
  'views/projects_list',
  'views/projects_form',
  'route_helper'
], function(maria, ProjectsTemplate, ProjectsListView, ProjectsFormView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'ProjectsView', {
    controllerConstructor: null,
    template: ProjectsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
      this.appendChild(new ProjectsListView(model));
      this.appendChild(new ProjectsFormView(model));
    }
  });

  return namespace.ProjectsView;
});
