define([
  'lib/test',
  'lib/maria',
  'models/question'
], function(test, maria, QuestionModel) {
  return new test.Suite("QuestionModel", {
    setUp: function() {
      this.question = new QuestionModel();
      this.observer = {triggered: false, trigger: function() { this.triggered = true }};
    },

    "setId triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setId(1);
      this.assert(this.observer.triggered);
    },

    "getId": function() {
      this.question.setId(1);
      this.assertEquals(this.question.getId(), 1);
    },

    "setName triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setName("foo");
      this.assert(this.observer.triggered);
    },

    "setName same value doesn't trigger 'change'": function() {
      this.question.setName("foo");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setName("foo");
      this.assert(!this.observer.triggered);
    },

    "getName": function() {
      this.question.setName("foo");
      this.assertEquals(this.question.getName(), "foo");
    },

    "setType triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setType("text");
      this.assert(this.observer.triggered);
    },

    "setType same value doesn't trigger 'change'": function() {
      this.question.setType("text");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setType("text");
      this.assert(!this.observer.triggered);
    },

    "getType": function() {
      this.question.setType("text");
      this.assertEquals(this.question.getType(), "text");
    },

    "setPrompt triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setPrompt("foo");
      this.assert(this.observer.triggered);
    },

    "setPrompt same value doesn't trigger 'change'": function() {
      this.question.setPrompt("foo");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setPrompt("foo");
      this.assert(!this.observer.triggered);
    },

    "getPrompt": function() {
      this.question.setPrompt("foo");
      this.assertEquals(this.question.getPrompt(), "foo");
    },

    "setFormId triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setFormId(1);
      this.assert(this.observer.triggered);
    },

    "setFormId same value doesn't trigger 'change'": function() {
      this.question.setFormId(1);
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setFormId(1);
      this.assert(!this.observer.triggered);
    },

    "getFormId": function() {
      this.question.setFormId(1);
      this.assertEquals(this.question.getFormId(), 1);
    },

    "getAttributes": function() {
      this.question.setId(1);
      this.question.setName("foo");
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      this.assertEquals(this.question.getAttributes(), {
        id: 1, name: "foo", type: "text", prompt: "Foo:", form_id: 1
      })
    },

    "requires name": function() {
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      this.refute(this.question.isValid());
      this.question.setName("foo");
      this.assert(this.question.isValid());
    },

    "requires name string": function() {
      this.question.setName(123);
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      this.refute(this.question.isValid());
      this.question.setName("foo");
      this.assert(this.question.isValid());
    },

    "requires name format": function() {
      this.question.setName("foo bar");
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      this.refute(this.question.isValid());
      this.question.setName("foo");
      this.assert(this.question.isValid());
    },

    "requires type": function() {
      this.question.setName("foo");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      this.refute(this.question.isValid());
      this.question.setType("text");
      this.assert(this.question.isValid());
    },

    "requires prompt": function() {
      this.question.setName("foo");
      this.question.setType("text");
      this.question.setFormId(1);
      this.refute(this.question.isValid());
      this.question.setPrompt("Foo:");
      this.assert(this.question.isValid());
    },

    "requires form_id": function() {
      this.question.setName("foo");
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.refute(this.question.isValid());
      this.question.setFormId(1);
      this.assert(this.question.isValid());
    }
  });
});
