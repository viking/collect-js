define([
  'lib/maria',
  'templates/admin/project_item',
  'route_helper'
], function(maria, AdminProjectItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectItemView', {
    controllerConstructor: null,
    template: AdminProjectItemTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      buildData: function() {
        var model = this.getModel();
        var a = this.find('a');
        a.innerHTML = model.getName();
        a.setAttribute('href', this.urlFor('/admin/projects/'+model.getId()));
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.AdminProjectItemView;
});
