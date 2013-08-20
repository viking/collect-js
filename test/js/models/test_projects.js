require([
  'lib/maria',
  'model',
  'models/projects',
  'models/project'
], function(maria, Model, ProjectsModel, ProjectModel) {
  buster.testCase('ProjectsModel', {
    'validates project name uniqueness': function() {
      var project = new ProjectModel();
      var projects = new ProjectsModel();
      projects.add(project);

      this.stub(project, 'validatesUnique');
      project.isValid();
      assert.calledWith(project.validatesUnique, 'name', projects);
    },

    'validates project id uniqueness': function() {
      var project = new ProjectModel();
      var projects = new ProjectsModel();
      projects.add(project);

      this.stub(project, 'validatesUnique');
      project.isValid();
      assert.calledWith(project.validatesUnique, 'id', projects);
    },

    'validating invalid object': function() {
      var projects = new ProjectsModel();
      var model = new Model();
      maria.on(model, 'validate', projects, 'onValidateProject');
      assert.exception(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var projects = new ProjectsModel();
      var model = new Model();
      assert.exception(function() {
        projects.add(model);
      });
    }
  });
});
