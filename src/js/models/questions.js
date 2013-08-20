define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'QuestionsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateQuestion');
    },
    properties: {
      onValidateQuestion: function(evt) {
        var question = evt.target;
        question.validatesUnique('id', this);
        question.validatesUnique('name', this);
      }
    }
  });

  return namespace.QuestionsModel;
});
