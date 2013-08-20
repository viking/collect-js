define(['models/projects', 'views/admin/projects_input'], function(ProjectsModel, AdminProjectsInputView) {
  buster.testCase('AdminProjectsInputView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new AdminProjectsInputView(this.projects);
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
    },

    "display errors": function() {
      this.view.displayErrors({name: ['foo']});
      assert.equals(this.view.find('input').getAttribute('class'), 'name error');
    },

    "reset clears errors": function() {
      this.view.displayErrors({name: ['foo']});
      this.view.reset();
      refute(this.view.find('.error'));
    }
  });
});
