require([
  'models/forms',
  'models/form'
], function(FormsModel, FormModel) {
  buster.testCase('FormsModel', {
    'validates form name uniqueness': function() {
      var form = new FormModel();
      var forms = new FormsModel();
      forms.add(form);

      this.stub(form, 'validatesUnique');
      form.isValid();
      assert.calledWith(form.validatesUnique, 'name', forms);
    }
  });
});
