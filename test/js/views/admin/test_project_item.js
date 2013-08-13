define(['models/project', 'views/admin/project_item'], function(ProjectModel, AdminProjectItemView) {
  buster.testCase('AdminProjectItemView', {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setId(1);
      this.project.setName("foo");
      this.view = new AdminProjectItemView(this.project);
    },

    "inserts name": function() {
      var a = this.view.find('a');
      assert.equals(a.innerHTML, "foo");
    },

    "inserts link": function() {
      var a = this.view.find('a');
      assert.equals(a.getAttribute('href'), "/admin/projects/1");
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      var a = this.view.find('a');
      assert.equals(a.innerHTML, "bar");
    },
  });
});
