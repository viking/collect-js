buster.testCase('FormsListView', {
  setUp: function() {
    var form_1 = new Collect.FormModel();
    form_1.setName("foo");
    var form_2 = new Collect.FormModel();
    form_2.setName("bar");

    this.forms = new Collect.FormsModel();
    this.forms.add(form_1);
    this.forms.add(form_2);

    this.view = new Collect.FormsListView(this.forms);
  },

  "creates child views": function() {
    var elts = this.view.findAll('li');
    assert.equals(elts.length, 2);
  }
});
