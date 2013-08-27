define([
  'lib/test',
  'lib/maria',
  'models/form',
  'models/questions',
  'models/question',
], function(test, maria, FormModel, QuestionsModel, QuestionModel) {
  return new test.Suite("FormModel", {
    setUp: function() {
      this.form = new FormModel();
      this.observer = {triggered: false, trigger: function() { this.triggered = true }};
    },

    "setId triggers 'change'": function() {
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setId(1);
      this.assert(this.observer.triggered);
    },

    "getId": function() {
      this.form.setId(1);
      this.assertEquals(this.form.getId(), 1);
    },

    "setName triggers 'change'": function() {
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setName("foo");
      this.assert(this.observer.triggered);
    },

    "setName same value doesn't trigger 'change'": function() {
      this.form.setName("foo");
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setName("foo");
      this.assert(!this.observer.triggered);
    },

    "getName": function() {
      this.form.setName("foo");
      this.assertEquals(this.form.getName(), "foo");
    },

    "setProjectId triggers 'change'": function() {
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setProjectId(1);
      this.assert(this.observer.triggered);
    },

    "setProjectId same value doesn't trigger 'change'": function() {
      this.form.setProjectId(1);
      maria.on(this.form, "change", this.observer, "trigger");
      this.form.setProjectId(1);
      this.assert(!this.observer.triggered);
    },

    "getProjectId": function() {
      this.form.setProjectId(1);
      this.assertEquals(this.form.getProjectId(), 1);
    },

    "getAttributes": function() {
      this.form.setId(1);
      this.form.setName("foo");
      this.form.setProjectId(1);
      this.assertEquals(this.form.getAttributes(), {id: 1, name: "foo", project_id: 1})
    },

    "getQuestions": function() {
      var questions = this.form.getQuestions();
      this.assert(questions instanceof QuestionsModel);
      this.assertSame(questions, this.form.getQuestions());
    },

    "validates name": function() {
      this.form.setProjectId(123);
      this.refute(this.form.isValid());
      this.form.setName('foo');
      this.assert(this.form.isValid());
    },

    "validates project_id": function() {
      this.form.setName('foo');
      this.refute(this.form.isValid());
      this.form.setProjectId(123);
      this.assert(this.form.isValid());
    },

    "record model": new test.Suite('record model', {
      setUp: function() {
        this.form.setProjectId(123);
        this.form.setName('foo');
        this.form.setId(456);
      },

      "id attribute": function() {
        var klass = this.form.getRecordModelClass();
        var model = new klass();
        model.setId(1);
        this.assertEquals(model.getId(), 1);
      },

      "record_id attribute": function() {
        var klass = this.form.getRecordModelClass();
        var model = new klass();
        model.setRecordId(1);
        this.assertEquals(model.getRecordId(), 1);
      },

      "question attribute": function() {
        var question = new QuestionModel();
        question.setName('foo');
        question.setType('text');
        question.setPrompt('Foo:');
        question.setFormId(456);
        this.form.getQuestions().add(question);

        var klass = this.form.getRecordModelClass();
        var model = new klass();
        model.setFoo('bar');
        this.assertEquals(model.getFoo(), 'bar');
      },

      "requires record_id": function() {
        var klass = this.form.getRecordModelClass();
        var model = new klass();
        this.refute(model.isValid());
        model.setRecordId(1);
        this.assert(model.isValid());
      },
    })
  });
});
