define([
  'models/question',
  'models/questions',
  'views/admin/questions_list'
], function(QuestionModel, QuestionsModel, AdminQuestionsListView) {
  buster.testCase('AdminQuestionsListView', {
    setUp: function() {
      var question_1 = new QuestionModel();
      question_1.setName("foo");
      var question_2 = new QuestionModel();
      question_2.setName("bar");

      this.questions = new QuestionsModel();
      this.questions.add(question_1);
      this.questions.add(question_2);

      this.view = new AdminQuestionsListView(this.questions);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      assert.equals(elts.length, 2);
    }
  });
});
