buster.testCase('FormItemView', {
  setUp: function() {
    this.form = new Collect.FormModel();
    this.form.setId(1);
    this.form.setName("foo");
    this.form.setProjectId(1);
    this.view = new Collect.FormItemView(this.form);
  },

  "inserts name": function() {
    var li = this.view.find('li');
    assert.equals(li.innerHTML, "foo");
  },

  "updates on change": function() {
    this.view.build();
    this.form.setName("bar");
    var li = this.view.find('li');
    assert.equals(li.innerHTML, "bar");
  },
});
