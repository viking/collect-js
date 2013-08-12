define(['models/question', 'views/question_item'], function(QuestionModel, QuestionItemView) {
  buster.testCase('QuestionItemView', {
    setUp: function() {
      this.question = new QuestionModel();
      this.question.setName("foo");
      this.view = new QuestionItemView(this.question);
    },

    "inserts name": function() {
      var li = this.view.find('li');
      assert.equals(li.innerHTML, "foo");
    },

    "updates on change": function() {
      this.view.build();
      this.question.setName("bar");
      var li = this.view.find('li');
      assert.equals(li.innerHTML, "bar");
    },
  });
});
