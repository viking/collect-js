buster.testCase("ProjectModel", {
  setUp: function() {
    this.project = new Collect.ProjectModel();
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

  "attributes": function() {
    this.project.setId(1);
    this.project.setName("foo");
    assert.equals(this.project.attributes(), {id: 1, name: "foo"})
  }
});
