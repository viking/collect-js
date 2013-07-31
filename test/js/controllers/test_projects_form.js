buster.testCase('ProjectsFormController', {
  setUp: function() {
    this.model = new Collect.ProjectsModel();
    this.controller = new Collect.ProjectsFormController();
    this.view = new Collect.ProjectsFormView(this.model, this.controller);
  },

  "on submit": function() {
    this.view.find('input.name').value = 'foo';
    eventFire(this.view.find('input.create'), 'click');
    assert.equals(this.model.size, 1);
    assert.equals(this.view.find('input.name').value, '');
  },
});
