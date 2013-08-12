define(['models/projects', 'views/admin/projects_form'], function(ProjectsModel, AdminProjectsFormView) {
  buster.testCase('AdminProjectsFormView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new AdminProjectsFormView(this.projects);
    },

    "get values": function() {
      this.view.find('input').value = 'foo';
      assert.equals(this.view.getValues(), {name:'foo'});
    },

    "reset dialog": function() {
      var input = this.view.find('input');
      input.value = 'foo';

      this.view.reset();
      assert.equals(input.value, '');
    }
  });
});
