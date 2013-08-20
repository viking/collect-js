require([
  'models/questions',
  'models/question'
], function(QuestionsModel, QuestionModel) {
  buster.testCase('QuestionsModel', {
    'validates question name uniqueness': function() {
      var question = new QuestionModel();
      var questions = new QuestionsModel();
      questions.add(question);

      this.stub(question, 'validatesUnique');
      question.isValid();
      assert.calledWith(question.validatesUnique, 'name', questions);
    },

    'validates question id uniqueness': function() {
      var question = new QuestionModel();
      var questions = new QuestionsModel();
      questions.add(question);

      this.stub(question, 'validatesUnique');
      question.isValid();
      assert.calledWith(question.validatesUnique, 'id', questions);
    }
  });
});
