define([
  'lib/test',
  'lib/maria',
  'models/project',
  'models/forms',
  'models/records'
], function(test, maria, ProjectModel, FormsModel, RecordsModel) {
  return new test.Suite("ProjectModel", {
    setUp: function() {
      this.project = new ProjectModel();
      this.observer = {triggered: false, trigger: function() { this.triggered = true }};
    },

    "setId triggers 'change'": function() {
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setId(1);
      this.assert(this.observer.triggered);
    },

    "getId": function() {
      this.project.setId(1);
      this.assertEquals(this.project.getId(), 1);
    },

    "setName triggers 'change'": function() {
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setName("foo");
      this.assert(this.observer.triggered);
    },

    "setName same value doesn't trigger 'change'": function() {
      this.project.setName("foo");
      maria.on(this.project, "change", this.observer, "trigger");
      this.project.setName("foo");
      this.assert(!this.observer.triggered);
    },

    "getName": function() {
      this.project.setName("foo");
      this.assertEquals(this.project.getName(), "foo");
    },

    "getAttributes": function() {
      this.project.setId(1);
      this.project.setName("foo");
      this.assertEquals(this.project.getAttributes(), {id: 1, name: "foo"})
    },

    "getForms": function() {
      var forms = this.project.getForms();
      this.assert(forms instanceof FormsModel);
      this.assertSame(forms, this.project.getForms());
    },

    "requires presence of name": function() {
      this.refute(this.project.isValid());
      this.project.setName('foo');
      this.assert(this.project.isValid());
    },

    "requires name be a string": function() {
      this.project.setName(123);
      this.refute(this.project.isValid());
      this.project.setName('foo');
      this.assert(this.project.isValid());
    },

    "getRecords": function() {
      var records = this.project.getRecords();
      this.assert(records instanceof RecordsModel);
      this.assertSame(records, this.project.getRecords());
    },
  });
});
