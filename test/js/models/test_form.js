define([
  'lib/maria',
  'models/form',
  'models/questions',
], function(maria, FormModel, QuestionsModel) {
  buster.testCase("FormModel", {
    setUp: function() {
      this.form = new FormModel();
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

    "setProjectId triggers 'change'": function() {
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setProjectId(1);
      assert(this.observer.triggered);
    },

    "setProjectId same value doesn't trigger 'change'": function() {
      this.form.setProjectId(1);
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setProjectId(1);
      assert(!this.observer.triggered);
    },

    "getProjectId": function() {
      this.form.setProjectId(1);
      assert.equals(this.form.getProjectId(), 1);
    },

    "getAttributes": function() {
      this.form.setId(1);
      this.form.setName("foo");
      this.form.setProjectId(1);
      assert.equals(this.form.getAttributes(), {id: 1, name: "foo", project_id: 1})
    },

    "getQuestions": function() {
      var questions = this.form.getQuestions();
      assert(questions instanceof QuestionsModel);
      assert.same(questions, this.form.getQuestions());
    },

    "validates name": function() {
      this.form.setProjectId(123);
      refute(this.form.isValid());
      this.form.setName('foo');
      assert(this.form.isValid());
    },

    "validates project_id": function() {
      this.form.setName('foo');
      refute(this.form.isValid());
      this.form.setProjectId(123);
      assert(this.form.isValid());
    }
  });
});
