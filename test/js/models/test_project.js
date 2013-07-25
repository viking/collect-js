buster.testCase("ProjectModel", {
  setUp: function() {
    this.project = new Collect.ProjectModel();
    this.observer = {triggered: false, trigger: function() { this.triggered = true }};
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
    assert.equals("foo", this.project.getName());
  },
});
