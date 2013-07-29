buster.testCase('ProjectsListView', {
  setUp: function() {
    var project_1 = new Collect.ProjectModel();
    project_1.setName("foo");
    var project_2 = new Collect.ProjectModel();
    project_2.setName("bar");

    this.projects = new Collect.ProjectsModel();
    this.projects.add(project_1);
    this.projects.add(project_2);

    this.view = new Collect.ProjectsListView(this.projects);
  },

  "creates child views": function() {
    var elts = this.view.findAll('li');
    assert.equals(elts.length, 2);
    assert.equals(elts[0].innerHTML, "foo");
    assert.equals(elts[1].innerHTML, "bar");
  }
});
