define(['models/projects', 'views/admin/projects'], function(ProjectsModel, AdminProjectsView) {
  buster.testCase('AdminProjectsView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new AdminProjectsView(this.projects);
    },

    "has list and form as children": function() {
      assert(this.view.find('ul.projects'));
      assert(this.view.find('section.projects-form'));
    }
  });
});
