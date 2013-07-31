buster.testCase('ProjectsFormView', {
  setUp: function() {
    this.projects = new Collect.ProjectsModel();
    this.view = new Collect.ProjectsFormView(this.projects);
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
