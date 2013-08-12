define(['models/projects', 'views/projects'], function(ProjectsModel, ProjectsView) {
  buster.testCase('ProjectsView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new ProjectsView(this.projects);
    },

    "has list as child": function() {
      assert(this.view.find('ul.projects'));
    }
  });
});
