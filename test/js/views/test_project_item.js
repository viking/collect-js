define([
  'lib/test',
  'models/project',
  'views/project_item'
], function(test, ProjectModel, ProjectItemView) {
  return new test.Suite('ProjectItemView', {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setId(1);
      this.project.setName("foo");
      this.view = new ProjectItemView(this.project);
    },

    "inserts name": function() {
      this.assertEquals(this.view.find('a').innerHTML, "foo");
    },

    "inserts link to project": function() {
      this.assertEquals(this.view.find('a').getAttribute('href'), '/projects/1');
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      this.assertEquals(this.view.find('a').innerHTML, "bar");
    },
  });
});
