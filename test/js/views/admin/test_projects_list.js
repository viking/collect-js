define([
  'lib/test',
  'models/project',
  'models/projects',
  'views/admin/projects_list'
], function(test, ProjectModel, ProjectsModel, AdminProjectsListView) {
  return new test.Suite('AdminProjectsListView', {
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
      this.assertEquals(elts.length, 2);
    }
  });
});
