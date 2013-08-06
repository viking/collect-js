buster.testCase('FormsView', {
  setUp: function() {
    this.forms = new Collect.FormsModel();
    this.view = new Collect.FormsView(this.forms);
  },

  "has list and form as children": function() {
    assert(this.view.find('ul.forms'));
    assert(this.view.find('section.forms-form'));
  }
});
