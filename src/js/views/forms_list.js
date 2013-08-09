define([
  'lib/maria',
  'templates/forms_list',
  'views/form_item',
  'route_helper'
], function(maria, FormsListTemplate, FormItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'FormsListView', {
    controllerConstructor: null,
    template: FormsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(form) {
        return new FormItemView(form);
      }
    }
  });

  return namespace.FormsListView;
});
