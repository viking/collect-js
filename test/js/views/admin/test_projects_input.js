define([
  'lib/test',
  'models/projects',
  'views/admin/projects_input'
], function(test, ProjectsModel, AdminProjectsInputView) {
  return new test.Suite('AdminProjectsInputView', {
    setUp: function() {
      this.projects = new ProjectsModel();
      this.view = new AdminProjectsInputView(this.projects);
    },

    "get values": function() {
      this.view.find('input').value = 'foo';
      this.assertEquals(this.view.getValues(), {name:'foo'});
    },

    "reset dialog": function() {
      var input = this.view.find('input');
      input.value = 'foo';

      this.view.reset();
      this.assertEquals(input.value, '');
    },

    "display errors": function() {
      this.view.displayErrors({name: ['foo']});
      this.assertEquals(this.view.find('input').getAttribute('class'), 'name error');
    },

    "reset clears errors": function() {
      this.view.displayErrors({name: ['foo']});
      this.view.reset();
      this.refute(this.view.find('.error'));
    }
  });
});
