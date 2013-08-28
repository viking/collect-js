define([
  'lib/test',
  'models/questions',
  'views/admin/questions_input'
], function(test, QuestionsModel, AdminQuestionsInputView) {
  return new test.Suite('AdminQuestionsInputView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new AdminQuestionsInputView(this.questions);
    },

    "get values": function() {
      this.view.setFormId(123);
      this.view.find('input.name').value = 'foo';
      this.view.find('select.type').selectedIndex = 0;
      this.view.find('input.prompt').value = 'Foo:';
      this.assertEquals(this.view.getValues(), {
        name: 'foo', type: 'text', prompt: "Foo:", form_id: "123" // XXX: should this be a string?
      });
    },

    "reset": function() {
      var name = this.view.find('input.name');
      var type = this.view.find('select.type');
      var prompt = this.view.find('input.prompt');

      name.value = 'foo';
      type.selectedIndex = 0;
      prompt.value = 'Foo:'

      this.view.reset();
      this.assertEquals(name.value, '');
      this.assertEquals(type.selectedIndex, 0);
      this.assertEquals(prompt.value, '');
    }
  });
});


