buster.testCase('FormsView', {
  setUp: function() {
    this.forms = new Collect.FormsModel();
    stubView(this, Collect, 'FormsListView');
    stubView(this, Collect, 'FormsFormView');
    this.view = new Collect.FormsView(this.forms);
  },

  "has list and form as children": function() {
    assert.calledOnce(Collect.FormsListView);
    assert.same(this.view.childNodes[0], getInstance(Collect, 'FormsListView'));

    assert.calledOnce(Collect.FormsFormView);
    assert.same(this.view.childNodes[1], getInstance(Collect, 'FormsFormView'));
  },

  "setting project id": function() {
    this.view.setProjectId(123);
    var formView = getInstance(Collect, 'FormsFormView');
    assert.calledWith(formView.setProjectId, 123);
  },
});
