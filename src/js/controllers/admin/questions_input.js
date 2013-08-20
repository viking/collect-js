define(['lib/maria', 'models/question'], function(maria, QuestionModel) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AdminQuestionsInputController', {
    properties: {
      onSubmit: function() {
        var view = this.getView();
        var values = view.getValues();
        var question = new QuestionModel();
        question.setName(values.name);
        question.setType(values.type);
        question.setPrompt(values.prompt);
        question.setFormId(values.form_id);

        maria.on(question, 'validate', this.getModel(), 'onValidateQuestion');
        if (question.isValid()) {
          this.getModel().add(question);
          view.reset();
        }
        else {
          view.displayErrors(question.getErrors());
        }
      }
    }
  });

  return namespace.AdminQuestionsInputController;
});
