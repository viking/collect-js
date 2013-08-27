define([
  'lib/test',
  'lib/sinon',
  'util',
  'models/projects',
  'models/project',
  'views/admin/projects_input',
  'controllers/admin/projects_input'
], function(test, sinon, util, ProjectsModel, ProjectModel, AdminProjectsInputView, AdminProjectsInputController) {
  return new test.Suite('AdminProjectsInputController', {
    setUp: function() {
      this.model = new ProjectsModel();
      this.controller = new AdminProjectsInputController();
      this.view = new AdminProjectsInputView(this.model, this.controller);
    },

    "on submit": sinon.test(function() {
      this.stub(ProjectModel.prototype, 'isValid').returns(true);
      this.view.find('input.name').value = 'foo';
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 1);
      this.assertEquals(this.view.find('input.name').value, '');
    }),

    "on submit when invalid": sinon.test(function() {
      this.stub(ProjectModel.prototype, 'isValid').returns(false);
      this.stub(ProjectModel.prototype, 'getErrors').returns({foo:['bar']});
      this.stub(this.view, 'displayErrors');
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertEquals(this.model.size, 0);
      this.assertCalledWith(this.view.displayErrors, {foo:['bar']});
    }),

    "setModel validates project": sinon.test(function() {
      this.stub(this.model, 'onValidateProject');
      this.view.find('input.name').value = 'foo';
      util.eventFire(this.view.find('input.create'), 'click');
      this.assertCalled(this.model.onValidateProject, 1);
    })
  });
});
