define(['models/forms', 'views/forms_form'], function(FormsModel, FormsFormView) {
  buster.testCase('FormsFormView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new FormsFormView(this.forms);
    },

    "get values": function() {
      this.view.setProjectId(123);
      this.view.find('input').value = 'foo';
      assert.equals(this.view.getValues(), {name:'foo',project_id:123});
    },

    "reset dialog": function() {
      var input = this.view.find('input');
      input.value = 'foo';

      this.view.reset();
      assert.equals(input.value, '');
    }
  });
});

