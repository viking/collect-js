define([
  'lib/test',
  'models/form',
  'models/forms',
  'views/admin/forms_list'
], function(test, FormModel, FormsModel, AdminFormsListView) {
  return new test.Suite('AdminFormsListView', {
    setUp: function() {
      var form_1 = new FormModel();
      form_1.setName("foo");
      var form_2 = new FormModel();
      form_2.setName("bar");

      this.forms = new FormsModel();
      this.forms.add(form_1);
      this.forms.add(form_2);

      this.view = new AdminFormsListView(this.forms);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      this.assertEquals(elts.length, 2);
    }
  });
});
