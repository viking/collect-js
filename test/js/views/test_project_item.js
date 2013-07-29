buster.testCase('ProjectItemView', {
  setUp: function() {
    this.project = new Collect.ProjectModel();
    this.project.setName("foo");
    this.view = new Collect.ProjectItemView(this.project);
  },

  "inserts name": function() {
    var h1 = this.view.find('li');
    assert.equals(h1.innerHTML, "foo");
  },

  "updates on change": function() {
    this.view.build();
    this.project.setName("bar");
    var h1 = this.view.find('li');
    assert.equals(h1.innerHTML, "bar");
  },
});
