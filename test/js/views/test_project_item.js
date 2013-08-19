define(['models/project', 'views/project_item'], function(ProjectModel, ProjectItemView) {
  buster.testCase('ProjectItemView', {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setId(1);
      this.project.setName("foo");
      this.view = new ProjectItemView(this.project);
    },

    "inserts name": function() {
      assert.equals(this.view.find('a').innerHTML, "foo");
    },

    "inserts link to project": function() {
      assert.equals(this.view.find('a').getAttribute('href'), '/projects/1');
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      assert.equals(this.view.find('a').innerHTML, "bar");
    },
  });
});
