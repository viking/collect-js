define([
  'lib/maria',
  'templates/admin/forms_list',
  'views/admin/form_item',
  'route_helper'
], function(maria, AdminFormsListTemplate, AdminFormItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'AdminFormsListView', {
    controllerConstructor: null,
    template: AdminFormsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(form) {
        return new AdminFormItemView(form);
      }
    }
  });

  return namespace.AdminFormsListView;
});
