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

    'validating invalid object': function() {
      var questions = new QuestionsModel();
      var model = new Model();
      maria.on(model, 'validate', questions, 'onValidateQuestion');

      assert.exception(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var questions = new QuestionsModel();
      var model = new Model();
      assert.exception(function() {
        questions.add(model);
      });
    }
  });
});
