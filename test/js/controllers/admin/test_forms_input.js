define([
  'models/forms',
  'views/admin/forms_input',
  'controllers/admin/forms_input'
], function(FormsModel, AdminFormsInputView, AdminFormsInputController) {
  buster.testCase('AdminFormsInputController', {
    setUp: function() {
      this.model = new FormsModel();
      this.controller = new AdminFormsInputController();
      this.view = new AdminFormsInputView(this.model, this.controller);
      this.view.setProjectId(123);
    },

    "on submit": function() {
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);

      var form = this.model.toArray()[0];
      assert.equals(form.getProjectId(), 123);
      assert.equals(this.view.find('input.name').value, '');
    },
  });
});
