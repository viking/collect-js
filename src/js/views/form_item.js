define([
  'lib/maria',
  'templates/form_item',
  'route_helper'
], function(maria, FormItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'FormItemView', {
    controllerConstructor: null,
    template: FormItemTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      buildData: function() {
        var model = this.getModel();
        var li = this.find('li');
        li.innerHTML = model.getName();
      },
      update: function() {
        this.buildData();
      }
    }
  });

  return namespace.FormItemView;
});
