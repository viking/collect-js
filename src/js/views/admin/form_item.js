define([
  'lib/maria',
  'templates/admin/form_item',
  'route_helper'
], function(maria, AdminFormItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormItemView', {
    controllerConstructor: null,
    template: AdminFormItemTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      buildData: function() {
        var model = this.getModel();
        var a = this.find('a');
        a.innerHTML = model.getName();
        a.setAttribute('href', this.urlFor('/forms/'+model.getId()));
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.AdminFormItemView;
});
