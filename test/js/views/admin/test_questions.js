define([
  'models/questions',
  'views/admin/questions_list',
  'views/admin/questions_input',
  'views/admin/questions'
], function(QuestionsModel, AdminQuestionsListView, AdminQuestionsInputView, AdminQuestionsView) {
  buster.testCase('AdminQuestionsView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new AdminQuestionsView(this.questions);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof AdminQuestionsListView);
      assert(this.view.childNodes[1] instanceof AdminQuestionsInputView);
    },

    "setting form id": function() {
      var inputView = this.view.childNodes[1];
      this.stub(inputView, 'setFormId');
      this.view.setFormId(123);
      assert.calledWith(inputView.setFormId, 123);
    }
  });
});

