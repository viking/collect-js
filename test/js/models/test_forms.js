define([
  'lib/test',
  'lib/sinon',
  'lib/maria',
  'model',
  'models/forms',
  'models/form'
], function(test, sinon, maria, Model, FormsModel, FormModel) {
  return new test.Suite('FormsModel', {
    'validates form name uniqueness': sinon.test(function() {
      var form = new FormModel();
      var forms = new FormsModel();
      forms.add(form);

      this.stub(form, 'validatesUnique');
      form.isValid();
      this.assertCalledWith(form.validatesUnique, 'name', forms);
    }),

    'validates form id uniqueness': sinon.test(function() {
      var form = new FormModel();
      var forms = new FormsModel();
      forms.add(form);

      this.stub(form, 'validatesUnique');
      form.isValid();
      this.assertCalledWith(form.validatesUnique, 'id', forms);
    }),

    'validating invalid object': sinon.test(function() {
      var forms = new FormsModel();
      var model = new Model();
      maria.on(model, 'validate', forms, 'onValidateForm');

      this.stub(model, 'addError');
      this.assertException(function() {
        model.isValid();
      });
    }),

    'adding invalid object': function() {
      var forms = new FormsModel();
      var model = new Model();
      this.assertException(function() {
        forms.add(model);
      });
    }
  });
});
