require([
  'lib/maria',
  'model',
  'models/forms',
  'models/form'
], function(maria, Model, FormsModel, FormModel) {
  buster.testCase('FormsModel', {
    'validates form name uniqueness': function() {
      var form = new FormModel();
      var forms = new FormsModel();
      forms.add(form);

      this.stub(form, 'validatesUnique');
      form.isValid();
      assert.calledWith(form.validatesUnique, 'name', forms);
    },

    'validates form id uniqueness': function() {
      var form = new FormModel();
      var forms = new FormsModel();
      forms.add(form);

      this.stub(form, 'validatesUnique');
      form.isValid();
      assert.calledWith(form.validatesUnique, 'id', forms);
    },

    'validating invalid object': function() {
      var forms = new FormsModel();
      var model = new Model();
      maria.on(model, 'validate', forms, 'onValidateForm');

      this.stub(model, 'addError');
      assert.exception(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var forms = new FormsModel();
      var model = new Model();
      assert.exception(function() {
        forms.add(model);
      });
    }
  });
});
