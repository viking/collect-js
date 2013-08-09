define(['models/form', 'models/forms', 'views/forms_list'], function(FormModel, FormsModel, FormsListView) {
  buster.testCase('FormsListView', {
    setUp: function() {
      var form_1 = new FormModel();
      form_1.setName("foo");
      var form_2 = new FormModel();
      form_2.setName("bar");

      this.forms = new FormsModel();
      this.forms.add(form_1);
      this.forms.add(form_2);

      this.view = new FormsListView(this.forms);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      assert.equals(elts.length, 2);
    }
  });
});
