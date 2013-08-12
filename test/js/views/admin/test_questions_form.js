define(['models/questions', 'views/admin/questions_form'], function(QuestionsModel, AdminQuestionsFormView) {
  buster.testCase('AdminQuestionsFormView', {
    setUp: function() {
      this.questions = new QuestionsModel();
      this.view = new AdminQuestionsFormView(this.questions);
    },

    "get values": function() {
      this.view.setFormId(123);
      this.view.find('input.name').value = 'foo';
      this.view.find('select.type').selectedIndex = 0;
      this.view.find('input.prompt').value = 'Foo:';
      assert.equals(this.view.getValues(), {
        name: 'foo', type: 'text', prompt: "Foo:", form_id: 123
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
      assert.equals(name.value, '');
      assert.equals(type.selectedIndex, 0);
      assert.equals(prompt.value, '');
    }
  });
});


