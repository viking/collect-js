buster.testCase('ProjectsFormView', {
  setUp: function() {
    this.projects = new Collect.ProjectsModel();
    this.view = new Collect.ProjectsFormView(this.projects);
  },

  "initialize dialog with no autoOpen": function() {
    var elt = this.view.build();
    var classes = elt.getAttribute('class').split(/ +/);
    assert.contains(classes, 'ui-dialog-content');
    assert.equals(elt.offsetWidth, 0);
    assert.equals(elt.offsetHeight, 0);
  },

  "open dialog": function() {
    var elt = this.view.build();
    this.view.open();
    assert.greater(elt.offsetWidth, 0);
    assert.greater(elt.offsetHeight, 0);
  },

  "get values": function() {
    this.view.open();
    this.view.find('input').value = 'foo';
    assert.equals(this.view.getValues(), {name:'foo'});
  },

  "close dialog": function() {
    var elt = this.view.build();
    this.view.open();

    var input = this.view.find('input')
    input.value = 'foo';

    this.view.close();

    assert.equals(elt.offsetWidth, 0);
    assert.equals(elt.offsetHeight, 0);
    assert.equals(input.value, '');
  }
});
