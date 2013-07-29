buster.testCase("FormModel", {
  setUp: function() {
    this.form = new Collect.FormModel();
    this.observer = {triggered: false, trigger: function() { this.triggered = true }};
  },

  "setId triggers 'change'": function() {
    maria.on(this.form, "change", this.observer, "trigger");
    this.form.setId(1);
    assert(this.observer.triggered);
  },

  "getId": function() {
    this.form.setId(1);
    assert.equals(this.form.getId(), 1);
  },

  "setName triggers 'change'": function() {
    maria.on(this.form, "change", this.observer, "trigger");
    this.form.setName("foo");
    assert(this.observer.triggered);
  },

  "setName same value doesn't trigger 'change'": function() {
    this.form.setName("foo");
    maria.on(this.form, "change", this.observer, "trigger");
    this.form.setName("foo");
    assert(!this.observer.triggered);
  },

  "getName": function() {
    this.form.setName("foo");
    assert.equals(this.form.getName(), "foo");
  },

  "attributes": function() {
    this.form.setId(1);
    this.form.setName("foo");
    assert.equals(this.form.attributes(), {id: 1, name: "foo"})
  }
});

