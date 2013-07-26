buster.testCase("ProjectView", {
  setUp: function() {
    this.project = new Collect.ProjectModel();
    this.project.setName("foo");
    this.view = new Collect.ProjectView(this.project);
  },

  "inserts name": function() {
    var h1 = this.view.find('h1');
    assert.equals(h1.innerHTML, "foo");
  },

  "updates on change": function() {
    this.view.build();
    this.project.setName("bar");
    var h1 = this.view.find('h1');
    assert.equals(h1.innerHTML, "bar");
  },
});
