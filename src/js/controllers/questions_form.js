define(['lib/maria', 'models/question'], function(maria, QuestionModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'QuestionsFormController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var question = new QuestionModel();
        question.setName(values.name);
        question.setType(values.type);
        question.setPrompt(values.prompt);
        question.setFormId(values.form_id);
        this.getModel().add(question);
        view.reset();
      }
    }
  });

  return namespace.QuestionsFormController;
});
