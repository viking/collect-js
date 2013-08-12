define([
  'models/questions',
  'views/admin/questions_list',
  'views/admin/questions_form',
  'views/admin/questions'
], function(QuestionsModel, AdminQuestionsListView, AdminQuestionsFormView, AdminQuestionsView) {
  buster.testCase('AdminQuestionsView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new AdminQuestionsView(this.questions);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof AdminQuestionsListView);
      assert(this.view.childNodes[1] instanceof AdminQuestionsFormView);
    },

    "setting form id": function() {
      var formView = this.view.childNodes[1];
      this.stub(formView, 'setFormId');
      this.view.setFormId(123);
      assert.calledWith(formView.setFormId, 123);
    }
  });
});

