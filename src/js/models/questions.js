define([
  'lib/maria',
  'models/question'
], function(maria, QuestionModel) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'QuestionsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateQuestion');
    },
    properties: {
      onValidateQuestion: function(evt) {
        var obj = evt.target;
        if (obj instanceof QuestionModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          obj.addError('base', 'is not a QuestionModel');
        }
      }
    }
  });

  return namespace.QuestionsModel;
});
