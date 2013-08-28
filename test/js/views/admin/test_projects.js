define([
  'lib/test',
  'models/projects',
  'views/admin/projects'
], function(test, ProjectsModel, AdminProjectsView) {
  return new test.Suite('AdminProjectsView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new AdminProjectsView(this.projects);
    },

    "has list and form as children": function() {
      this.assert(this.view.find('ul.projects'));
      this.assert(this.view.find('section.projects-input'));
    }
  });
});
