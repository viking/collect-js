define(['models/projects', 'views/projects'], function(ProjectsModel, ProjectsView) {
  buster.testCase('ProjectsView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new ProjectsView(this.projects);
    },

    "has list as child": function() {
      assert(this.view.find('ul.projects'));
    },

    "adds href to admin projects": function() {
      this.view.parentNode = {
        urlFor: this.stub().returns('/admin/projects')
      };
      assert.equals(this.view.find('a').getAttribute('href'), '/admin/projects');
    }
  });
});
