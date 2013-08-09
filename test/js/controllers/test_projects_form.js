define([
  'models/projects',
  'views/projects_form',
  'controllers/projects_form'
], function(ProjectsModel, ProjectsFormView, ProjectsFormController) {
  buster.testCase('ProjectsFormController', {
    setUp: function() {
      this.model = new ProjectsModel();
      this.controller = new ProjectsFormController();
      this.view = new ProjectsFormView(this.model, this.controller);
    },

    "on submit": function() {
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);
      assert.equals(this.view.find('input.name').value, '');
    },
  });
});
