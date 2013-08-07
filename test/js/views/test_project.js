buster.testCase("ProjectView", {
  setUp: function() {
    this.project = new Collect.ProjectModel();
    this.project.setName("foo");
    this.view = new Collect.ProjectView(this.project);
  },

  "inserts name": function() {
    var span = this.view.find('span.name');
    assert.equals(span.innerHTML, "foo");
  },

  "updates on change": function() {
    this.view.build();
    this.project.setName("bar");
    var span = this.view.find('span.name');
    assert.equals(span.innerHTML, "bar");
  }
});
