define([
  'lib/test',
  'models/question',
  'views/admin/question_item'
], function(test, QuestionModel, AdminQuestionItemView) {
  return new test.Suite('AdminQuestionItemView', {
    setUp: function() {
      this.question = new QuestionModel();
      this.question.setName("foo");
      this.view = new AdminQuestionItemView(this.question);
    },

    "inserts name": function() {
      var li = this.view.find('li');
      this.assertEquals(li.innerHTML, "foo");
    },

    "updates on change": function() {
      this.view.build();
      this.question.setName("bar");
      var li = this.view.find('li');
      this.assertEquals(li.innerHTML, "bar");
    },
  });
});
