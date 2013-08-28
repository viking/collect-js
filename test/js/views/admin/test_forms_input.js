define([
  'lib/test',
  'models/forms',
  'views/admin/forms_input'
], function(test, FormsModel, AdminFormsInputView) {
  return new test.Suite('AdminFormsInputView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new AdminFormsInputView(this.forms);
    },

    "get values": function() {
      this.view.setProjectId(123);
      this.view.find('input.name').value = 'foo';
      this.assertEquals(this.view.getValues(), { name: 'foo', project_id: "123" }); // XXX: should this be a string?
    },

    "reset dialog": function() {
      var input = this.view.find('input.name');
      input.value = 'foo';

      this.view.reset();
      this.assertEquals(input.value, '');
    }
  });
});

