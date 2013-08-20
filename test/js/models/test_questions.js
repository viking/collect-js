require([
  'lib/maria',
  'model',
  'models/questions',
  'models/question'
], function(maria, Model, QuestionsModel, QuestionModel) {
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
    },

    'validate child class': function() {
      var questions = new QuestionsModel();
      var model = new Model();
      maria.on(model, 'validate', questions, 'onValidateQuestion');

      this.stub(model, 'addError');
      model.isValid();
      assert.calledWith(model.addError, 'base', 'is not a QuestionModel');
    }
  });
});
