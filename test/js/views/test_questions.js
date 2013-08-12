define([
  'models/questions',
  'views/questions_list',
  'views/questions_form',
  'views/questions'
], function(QuestionsModel, QuestionsListView, QuestionsFormView, QuestionsView) {
  buster.testCase('QuestionsView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new QuestionsView(this.questions);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof QuestionsListView);
      assert(this.view.childNodes[1] instanceof QuestionsFormView);
    },

    "setting form id": function() {
      var formView = this.view.childNodes[1];
      this.stub(formView, 'setFormId');
      this.view.setFormId(123);
      assert.calledWith(formView.setFormId, 123);
    }
  });
});

