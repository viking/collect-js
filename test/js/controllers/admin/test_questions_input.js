define([
  'models/questions',
  'models/question',
  'views/admin/questions_input',
  'controllers/admin/questions_input'
], function(QuestionsModel, QuestionModel, AdminQuestionsInputView, AdminQuestionsInputController) {
  buster.testCase('AdminQuestionsInputController', {
    setUp: function() {
      this.model = new QuestionsModel();
      this.controller = new AdminQuestionsInputController();
      this.view = new AdminQuestionsInputView(this.model, this.controller);
      this.view.setFormId(123);
    },

    "on submit": function() {
      this.stub(QuestionModel.prototype, 'isValid').returns(true);
      this.stub(this.view, 'reset');
      this.view.find('input.name').value = 'foo';
      this.view.find('select.type').selectedIndex = 0;
      this.view.find('input.prompt').value = 'Foo:';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);

      var question = this.model.toArray()[0];
      assert.equals(question.getName(), 'foo');
      assert.equals(question.getType(), 'text');
      assert.equals(question.getPrompt(), 'Foo:');
      assert.equals(question.getFormId(), 123);
      assert.calledOnce(this.view.reset);
    },

    "on submit when invalid": function() {
      this.stub(QuestionModel.prototype, 'isValid').returns(false);
      this.stub(QuestionModel.prototype, 'getErrors').returns({name: ['foo']});
      this.stub(this.view, 'reset');
      this.stub(this.view, 'displayErrors');
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 0);
      refute.called(this.view.reset);
      assert.calledWith(this.view.displayErrors, {name:['foo']});
    },

    "setModel validates question": function() {
      this.stub(this.model, 'onValidateQuestion');
      eventFire(this.view.find('input.create'), 'click');
      assert.calledOnce(this.model.onValidateQuestion);
    }
  });
});

