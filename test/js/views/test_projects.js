buster.testCase('ProjectsView', {
  setUp: function() {
    this.projects = new Collect.ProjectsModel();
    this.view = new Collect.ProjectsView(this.projects);
  },

  "has list and form as children": function() {
    assert(this.view.find('ul.projects'));
    assert(this.view.find('section.projects-form'));
  }
});
