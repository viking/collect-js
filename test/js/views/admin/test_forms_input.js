define(['models/forms', 'views/admin/forms_input'], function(FormsModel, AdminFormsInputView) {
  buster.testCase('AdminFormsInputView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new AdminFormsInputView(this.forms);
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

