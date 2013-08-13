define(['lib/maria', 'models/question'], function(maria, QuestionModel) {
  buster.testCase("QuestionModel", {
    setUp: function() {
      this.question = new QuestionModel();
      this.observer = {triggered: false, trigger: function() { this.triggered = true }};
    },

    "setId triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setId(1);
      assert(this.observer.triggered);
    },

    "getId": function() {
      this.question.setId(1);
      assert.equals(this.question.getId(), 1);
    },

    "setName triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setName("foo");
      assert(this.observer.triggered);
    },

    "setName same value doesn't trigger 'change'": function() {
      this.question.setName("foo");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setName("foo");
      assert(!this.observer.triggered);
    },

    "getName": function() {
      this.question.setName("foo");
      assert.equals(this.question.getName(), "foo");
    },

    "setType triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setType("text");
      assert(this.observer.triggered);
    },

    "setType same value doesn't trigger 'change'": function() {
      this.question.setType("text");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setType("text");
      assert(!this.observer.triggered);
    },

    "getType": function() {
      this.question.setType("text");
      assert.equals(this.question.getType(), "text");
    },

    "setPrompt triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setPrompt("foo");
      assert(this.observer.triggered);
    },

    "setPrompt same value doesn't trigger 'change'": function() {
      this.question.setPrompt("foo");
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setPrompt("foo");
      assert(!this.observer.triggered);
    },

    "getPrompt": function() {
      this.question.setPrompt("foo");
      assert.equals(this.question.getPrompt(), "foo");
    },

    "setFormId triggers 'change'": function() {
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setFormId(1);
      assert(this.observer.triggered);
    },

    "setFormId same value doesn't trigger 'change'": function() {
      this.question.setFormId(1);
      maria.on(this.question, "change", this.observer, "trigger");
      this.question.setFormId(1);
      assert(!this.observer.triggered);
    },

    "getFormId": function() {
      this.question.setFormId(1);
      assert.equals(this.question.getFormId(), 1);
    },

    "getAttributes": function() {
      this.question.setId(1);
      this.question.setName("foo");
      this.question.setType("text");
      this.question.setPrompt("Foo:");
      this.question.setFormId(1);
      assert.equals(this.question.getAttributes(), {
        id: 1, name: "foo", type: "text", prompt: "Foo:", form_id: 1
      })
    }
  });
});
