define([
  'lib/test',
  'lib/sinon',
  'util',
  'models/forms',
  'models/form',
  'views/admin/forms_input',
  'controllers/admin/forms_input'
], function(test, sinon, util, FormsModel, FormModel, AdminFormsInputView, AdminFormsInputController) {
  return new test.Suite('AdminFormsInputController', {
    setUp: function() {
      this.model = new FormsModel();
      this.controller = new AdminFormsInputController();
      this.view = new AdminFormsInputView(this.model, this.controller);
      this.view.setProjectId(123);
    },

    "on submit": sinon.test(function() {
      this.stub(FormModel.prototype, 'isValid').returns(true);
      this.stub(this.view, 'reset');
      this.view.find('input.name').value = 'foo';
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 1);
      this.assertCalled(FormModel.prototype.isValid);

      var form = this.model.toArray()[0];
      this.assertEquals(form.getProjectId(), "123"); // XXX: should this really be a string?
      this.assertCalled(this.view.reset);
    }),

    "on submit when invalid": sinon.test(function() {
      this.stub(FormModel.prototype, 'isValid').returns(false);
      this.stub(FormModel.prototype, 'getErrors').returns({name: ['foo']})
      this.stub(this.view, 'reset');
      this.stub(this.view, 'displayErrors');

      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 0);
      this.refuteCalled(this.view.reset);
      this.assertCalledWith(this.view.displayErrors, {name: ['foo']});
    }),

    "setModel validates form": sinon.test(function() {
      this.stub(this.model, 'onValidateForm');
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertCalled(this.model.onValidateForm, 1);
    })
  });
});
