define([
  'models/question',
  'models/questions',
  'views/questions_list'
], function(QuestionModel, QuestionsModel, QuestionsListView) {
  buster.testCase('QuestionsListView', {
    setUp: function() {
      var question_1 = new QuestionModel();
      question_1.setName("foo");
      var question_2 = new QuestionModel();
      question_2.setName("bar");

      this.questions = new QuestionsModel();
      this.questions.add(question_1);
      this.questions.add(question_2);

      this.view = new QuestionsListView(this.questions);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      assert.equals(elts.length, 2);
    }
  });
});
