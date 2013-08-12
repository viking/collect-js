define([
  'lib/maria',
  'templates/admin/form',
  'route_helper'
], function(maria, AdminFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormView', {
    controllerConstructor: null,
    template: AdminFormTemplate.source,
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

  return namespace.AdminFormView;
});
