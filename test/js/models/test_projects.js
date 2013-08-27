define([
  'lib/test',
  'lib/sinon',
  'lib/maria',
  'model',
  'models/projects',
  'models/project'
], function(test, sinon, maria, Model, ProjectsModel, ProjectModel) {
  return new test.Suite('ProjectsModel', {
    'validates project name uniqueness': sinon.test(function() {
      var project = new ProjectModel();
      var projects = new ProjectsModel();
      projects.add(project);

      this.stub(project, 'validatesUnique');
      project.isValid();
      this.assertCalledWith(project.validatesUnique, 'name', projects);
    }),

    'validates project id uniqueness': sinon.test(function() {
      var project = new ProjectModel();
      var projects = new ProjectsModel();
      projects.add(project);

      this.stub(project, 'validatesUnique');
      project.isValid();
      this.assertCalledWith(project.validatesUnique, 'id', projects);
    }),

    'validating invalid object': function() {
      var projects = new ProjectsModel();
      var model = new Model();
      maria.on(model, 'validate', projects, 'onValidateProject');
      this.assertException(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var projects = new ProjectsModel();
      var model = new Model();
      this.assertException(function() {
        projects.add(model);
      });
    }
  });
});
