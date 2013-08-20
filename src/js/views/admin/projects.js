define([
  'lib/maria',
  'templates/admin/projects',
  'views/admin/projects_list',
  'views/admin/projects_input',
  'route_helper'
], function(maria, AdminProjectsTemplate, AdminProjectsListView, AdminProjectsInputView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectsView', {
    controllerConstructor: null,
    template: AdminProjectsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
      this.appendChild(new AdminProjectsListView(model));
      this.appendChild(new AdminProjectsInputView(model));
    }
  });

  return namespace.AdminProjectsView;
});
