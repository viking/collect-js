define([
  'lib/test',
  'models/project',
  'views/admin/project'
], function(test, ProjectModel, AdminProjectView) {
  return new test.Suite("AdminProjectView", {
    setUp: function() {
      this.project = new ProjectModel();
      this.project.setName("foo");
      this.view = new AdminProjectView(this.project);
    },

    "inserts name": function() {
      var span = this.view.find('span.name');
      this.assertEquals(span.innerHTML, "foo");
    },

    "updates on change": function() {
      this.view.build();
      this.project.setName("bar");
      var span = this.view.find('span.name');
      this.assertEquals(span.innerHTML, "bar");
    }
  });
});
