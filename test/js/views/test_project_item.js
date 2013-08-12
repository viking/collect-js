define(['models/project', 'views/project_item'], function(ProjectModel, ProjectItemView) {
  buster.testCase('ProjectItemView', {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setId(1);
      this.project.setName("foo");
      this.view = new ProjectItemView(this.project);
    },

    "inserts name": function() {
      assert.equals(this.view.find('span.name').innerHTML, "foo");
    },

    "inserts link": function() {
      assert.equals(this.view.find('a').getAttribute('href'), "/admin/projects/1");
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      assert.equals(this.view.find('span.name').innerHTML, "bar");
    },
  });
});
