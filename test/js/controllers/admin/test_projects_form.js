define([
  'models/projects',
  'models/project',
  'views/admin/projects_form',
  'controllers/admin/projects_form'
], function(ProjectsModel, ProjectModel, AdminProjectsFormView, AdminProjectsFormController) {
  buster.testCase('AdminProjectsFormController', {
    setUp: function() {
      this.model = new ProjectsModel();
      this.controller = new AdminProjectsFormController();
      this.view = new AdminProjectsFormView(this.model, this.controller);
    },

    "on submit": function() {
      this.stub(ProjectModel.prototype, 'isValid').returns(true);
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 1);
      assert.equals(this.view.find('input.name').value, '');
    },

    "on submit when invalid": function() {
      this.stub(ProjectModel.prototype, 'isValid').returns(false);
      this.stub(ProjectModel.prototype, 'getErrors').returns({foo:['bar']});
      this.stub(this.view, 'displayErrors');
      eventFire(this.view.find('input.create'), 'click');
      assert.equals(this.model.size, 0);
      assert.calledWith(this.view.displayErrors, {foo:['bar']});
    },

    "setModel validates project": function() {
      this.stub(this.model, 'onValidateProject');
      this.view.find('input.name').value = 'foo';
      eventFire(this.view.find('input.create'), 'click');
      assert.calledOnce(this.model.onValidateProject);
    }
  });
});
