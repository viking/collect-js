define([
  'lib/test',
  'lib/sinon',
  'models/questions',
  'views/admin/questions_list',
  'views/admin/questions_input',
  'views/admin/questions'
], function(test, sinon, QuestionsModel, AdminQuestionsListView, AdminQuestionsInputView, AdminQuestionsView) {
  return new test.Suite('AdminQuestionsView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new AdminQuestionsView(this.questions);
    },

    "has list and form as children": function() {
      this.assert(this.view.childNodes[0] instanceof AdminQuestionsListView);
      this.assert(this.view.childNodes[1] instanceof AdminQuestionsInputView);
    },

    "setting form id": sinon.test(function() {
      var inputView = this.view.childNodes[1];
      this.stub(inputView, 'setFormId');
      this.view.setFormId(123);
      this.assertCalledWith(inputView.setFormId, 123);
    })
  });
});

