define([
  'models/questions',
  'views/questions_form',
  'controllers/questions_form'
], function(QuestionsModel, QuestionsFormView, QuestionsFormController) {
  buster.testCase('QuestionsFormController', {
    setUp: function() {
      this.model = new QuestionsModel();
      this.controller = new QuestionsFormController();
      this.view = new QuestionsFormView(this.model, this.controller);
      this.view.setFormId(123);
    },

    "on submit": function() {
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
      assert.equals(this.view.find('input.name').value, '');
    },
  });
});

