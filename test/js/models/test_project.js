define([
  'lib/maria',
  'models/project',
  'models/forms'
], function(maria, ProjectModel, FormsModel) {
  buster.testCase("ProjectModel", {
    setUp: function() {
      this.project = new ProjectModel();
      this.observer = {triggered: false, trigger: function() { this.triggered = true }};
    },

    "setId triggers 'change'": function() {
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setId(1);
      assert(this.observer.triggered);
    },

    "getId": function() {
      this.project.setId(1);
      assert.equals(this.project.getId(), 1);
    },

    "setName triggers 'change'": function() {
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setName("foo");
      assert(this.observer.triggered);
    },

    "setName same value doesn't trigger 'change'": function() {
      this.project.setName("foo");
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setName("foo");
      assert(!this.observer.triggered);
    },

    "getName": function() {
      this.project.setName("foo");
      assert.equals(this.project.getName(), "foo");
    },

    "getAttributes": function() {
      this.project.setId(1);
      this.project.setName("foo");
      assert.equals(this.project.getAttributes(), {id: 1, name: "foo"})
    },

    "getForms": function() {
      var forms = this.project.getForms();
      assert(forms instanceof FormsModel);
      assert.same(forms, this.project.getForms());
    }
  });
});
