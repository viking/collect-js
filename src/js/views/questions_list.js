define([
  'lib/maria',
  'templates/questions_list',
  'views/question_item',
  'route_helper'
], function(maria, QuestionsListTemplate, QuestionItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'QuestionsListView', {
    template: QuestionsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(question) {
        return new QuestionItemView(question);
      }
    }
  });

  return namespace.QuestionsListView;
});
