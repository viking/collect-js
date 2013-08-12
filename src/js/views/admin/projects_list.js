define([
  'lib/maria',
  'templates/admin/projects_list',
  'views/admin/project_item',
  'route_helper'
], function(maria, AdminProjectsListTemplate, AdminProjectItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'AdminProjectsListView', {
    controllerConstructor: null,
    template: AdminProjectsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(project) {
        return new AdminProjectItemView(project);
      }
    }
  });

  return namespace.AdminProjectsListView;
});
