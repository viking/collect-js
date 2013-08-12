define([
  'lib/maria',
  'templates/admin/questions_list',
  'views/admin/question_item',
  'route_helper'
], function(maria, AdminQuestionsListTemplate, AdminQuestionItemView, RouteHelper) {
  var namespace = {};

  maria.SetView.subclass(namespace, 'AdminQuestionsListView', {
    template: AdminQuestionsListTemplate.source,
    constructor: function() {
      maria.SetView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      createChildView: function(question) {
        return new AdminQuestionItemView(question);
      }
    }
  });

  return namespace.AdminQuestionsListView;
});
