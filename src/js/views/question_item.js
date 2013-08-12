define([
  'lib/maria',
  'templates/question_item',
  'route_helper'
], function(maria, QuestionItemTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'QuestionItemView', {
    controllerConstructor: null,
    template: QuestionItemTemplate.source,
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

  return namespace.QuestionItemView;
});
