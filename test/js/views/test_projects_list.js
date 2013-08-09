define(['models/project', 'models/projects', 'views/projects_list'], function(ProjectModel, ProjectsModel, ProjectsListView) {
  buster.testCase('ProjectsListView', {
    setUp: function() {
      var project_1 = new ProjectModel();
      project_1.setName("foo");
      var project_2 = new ProjectModel();
      project_2.setName("bar");

      this.projects = new ProjectsModel();
      this.projects.add(project_1);
      this.projects.add(project_2);

      this.view = new ProjectsListView(this.projects);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      assert.equals(elts.length, 2);
    }
  });
});
