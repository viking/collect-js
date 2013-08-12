define([
  'models/projects',
  'views/admin/projects_form',
  'controllers/admin/projects_form'
], function(ProjectsModel, AdminProjectsFormView, AdminProjectsFormController) {
  buster.testCase('AdminProjectsFormController', {
    setUp: function() {
      this.model = new ProjectsModel();
      this.controller = new AdminProjectsFormController();
      this.view = new AdminProjectsFormView(this.model, this.controller);
    },

    "on submit": function() {
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);
      assert.equals(this.view.find('input.name').value, '');
    },
  });
});
