define([
  'lib/test',
  'models/project',
  'views/admin/project_item'
], function(test, ProjectModel, AdminProjectItemView) {
  return new test.Suite('AdminProjectItemView', {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setId(1);
      this.project.setName("foo");
      this.view = new AdminProjectItemView(this.project);
    },

    "inserts name": function() {
      var a = this.view.find('a');
      this.assertEquals(a.innerHTML, "foo");
    },

    "inserts link": function() {
      var a = this.view.find('a');
      this.assertEquals(a.getAttribute('href'), "/admin/projects/1");
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      var a = this.view.find('a');
      this.assertEquals(a.innerHTML, "bar");
    },
  });
});
