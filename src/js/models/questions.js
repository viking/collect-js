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
      add: function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof QuestionModel)) {
            throw('object is not a QuestionModel');
          }
        }
        maria.SetModel.prototype.add.apply(this, arguments);
      },

      onValidateQuestion: function(evt) {
        var obj = evt.target;
        if (obj instanceof QuestionModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          throw('object is not a QuestionModel');
        }
      }
    }
  });

  return namespace.QuestionsModel;
});
