define([
  'lib/test',
  'lib/sinon',
  'util',
  'models/questions',
  'models/question',
  'views/admin/questions_input',
  'controllers/admin/questions_input'
], function(test, sinon, util, QuestionsModel, QuestionModel, AdminQuestionsInputView, AdminQuestionsInputController) {
  return new test.Suite('AdminQuestionsInputController', {
    setUp: function() {
      this.model = new QuestionsModel();
      this.controller = new AdminQuestionsInputController();
      this.view = new AdminQuestionsInputView(this.model, this.controller);
      this.view.setFormId(123);
    },

    "on submit": sinon.test(function() {
      this.stub(QuestionModel.prototype, 'isValid').returns(true);
      this.stub(this.view, 'reset');
      this.view.find('input.name').value = 'foo';
      this.view.find('select.type').selectedIndex = 0;
      this.view.find('input.prompt').value = 'Foo:';
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 1);

      var question = this.model.toArray()[0];
      this.assertEquals(question.getName(), 'foo');
      this.assertEquals(question.getType(), 'text');
      this.assertEquals(question.getPrompt(), 'Foo:');
      this.assertEquals(question.getFormId(), "123"); // XXX: should this really be a string?
      this.assertCalled(this.view.reset, 1);
    }),

    "on submit when invalid": sinon.test(function() {
      this.stub(QuestionModel.prototype, 'isValid').returns(false);
      this.stub(QuestionModel.prototype, 'getErrors').returns({name: ['foo']});
      this.stub(this.view, 'reset');
      this.stub(this.view, 'displayErrors');
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 0);
      this.refuteCalled(this.view.reset);
      this.assertCalledWith(this.view.displayErrors, {name:['foo']});
    }),

    "setModel validates question": sinon.test(function() {
      this.stub(this.model, 'onValidateQuestion');
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertCalled(this.model.onValidateQuestion, 1);
    })
  });
});

