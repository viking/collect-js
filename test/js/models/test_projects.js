require([
  'models/projects',
  'models/project'
], function(ProjectsModel, ProjectModel) {
  buster.testCase('ProjectsModel', {
    'validates project name uniqueness': function() {
      var project = new ProjectModel();
      var projects = new ProjectsModel();
      projects.add(project);

      this.stub(project, 'validatesUnique');
      project.isValid();
      assert.calledWith(project.validatesUnique, 'name', projects);
    }
  });
});
