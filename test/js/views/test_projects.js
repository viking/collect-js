define([
  'lib/test',
  'lib/sinon',
  'models/projects',
  'views/projects'
], function(test, sinon, ProjectsModel, ProjectsView) {
  return new test.Suite('ProjectsView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new ProjectsView(this.projects);
    },

    "has list as child": function() {
      this.assert(this.view.find('ul.projects'));
    },

    "adds href to admin projects": function() {
      this.view.parentNode = {
        urlFor: sinon.stub().returns('/admin/projects')
      };
      this.assertEquals(this.view.find('a').getAttribute('href'), '/admin/projects');
    }
  });
});
