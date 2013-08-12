define(['models/project', 'models/projects', 'views/admin/projects_list'], function(ProjectModel, ProjectsModel, AdminProjectsListView) {
  buster.testCase('AdminProjectsListView', {
    setUp: function() {
      var project_1 = new ProjectModel();
      project_1.setName("foo");
      var project_2 = new ProjectModel();
      project_2.setName("bar");

      this.projects = new ProjectsModel();
      this.projects.add(project_1);
      this.projects.add(project_2);

      this.view = new AdminProjectsListView(this.projects);
    },

    "creates child views": function() {
      var elts = this.view.findAll('li');
      assert.equals(elts.length, 2);
    }
  });
});
