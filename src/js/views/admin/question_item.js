define([
  'lib/maria',
  'templates/admin/question_item',
  'route_helper'
], function(maria, AdminQuestionItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminQuestionItemView', {
    controllerConstructor: null,
    template: AdminQuestionItemTemplate.source,
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

  return namespace.AdminQuestionItemView;
});
