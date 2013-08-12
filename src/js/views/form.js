define([
  'lib/maria',
  'templates/form',
  'route_helper'
], function(maria, FormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'FormView', {
    controllerConstructor: null,
    template: FormTemplate.source,
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

  return namespace.FormView;
});
