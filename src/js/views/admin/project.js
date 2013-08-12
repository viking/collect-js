define([
  'lib/maria',
  'templates/admin/project',
  'route_helper'
], function(maria, AdminProjectTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectView', {
    controllerConstructor: null,
    template: AdminProjectTemplate.source,
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

  return namespace.AdminProjectView;
});
