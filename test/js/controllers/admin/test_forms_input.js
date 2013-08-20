define([
  'models/forms',
  'models/form',
  'views/admin/forms_input',
  'controllers/admin/forms_input'
], function(FormsModel, FormModel, AdminFormsInputView, AdminFormsInputController) {
  buster.testCase('AdminFormsInputController', {
    setUp: function() {
      this.model = new FormsModel();
      this.controller = new AdminFormsInputController();
      this.view = new AdminFormsInputView(this.model, this.controller);
      this.view.setProjectId(123);
    },

    "on submit": function() {
      this.stub(FormModel.prototype, 'isValid').returns(true);
      this.stub(this.view, 'reset');
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);
      assert.called(FormModel.prototype.isValid);

      var form = this.model.toArray()[0];
      assert.equals(form.getProjectId(), 123);
      assert.called(this.view.reset);
    },

    "on submit when invalid": function() {
      this.stub(FormModel.prototype, 'isValid').returns(false);
      this.stub(FormModel.prototype, 'getErrors').returns({name: ['foo']})
      this.stub(this.view, 'reset');
      this.stub(this.view, 'displayErrors');

      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 0);
      refute.called(this.view.reset);
      assert.calledWith(this.view.displayErrors, {name: ['foo']});
    },

    "setModel validates form": function() {
      this.stub(this.model, 'onValidateForm');
      eventFire(this.view.find('input.create'), 'click');
      assert.calledOnce(this.model.onValidateForm);
    }
  });
});
