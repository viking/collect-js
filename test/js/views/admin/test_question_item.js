define(['models/question', 'views/admin/question_item'], function(QuestionModel, AdminQuestionItemView) {
  buster.testCase('AdminQuestionItemView', {
    setUp: function() {
      this.question = new QuestionModel();
      this.question.setName("foo");
      this.view = new AdminQuestionItemView(this.question);
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
