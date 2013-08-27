define([
  'lib/test',
  'lib/sinon',
  'lib/maria',
  'model',
  'models/questions',
  'models/question'
], function(test, sinon, maria, Model, QuestionsModel, QuestionModel) {
  return new test.Suite('QuestionsModel', {
    'validates question name uniqueness': sinon.test(function() {
      var question = new QuestionModel();
      var questions = new QuestionsModel();
      questions.add(question);

      this.stub(question, 'validatesUnique');
      question.isValid();
      this.assertCalledWith(question.validatesUnique, 'name', questions);
    }),

    'validates question id uniqueness': sinon.test(function() {
      var question = new QuestionModel();
      var questions = new QuestionsModel();
      questions.add(question);

      this.stub(question, 'validatesUnique');
      question.isValid();
      this.assertCalledWith(question.validatesUnique, 'id', questions);
    }),

    'validating invalid object': function() {
      var questions = new QuestionsModel();
      var model = new Model();
      maria.on(model, 'validate', questions, 'onValidateQuestion');

      this.assertException(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var questions = new QuestionsModel();
      var model = new Model();
      this.assertException(function() {
        questions.add(model);
      });
    }
  });
});
