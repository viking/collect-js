define([
  'model',
  'models/questions'
], function(Model, QuestionsModel) {
  var namespace = {};

  Model.subclass(namespace, 'FormModel', {
    attributeNames: ['id', 'name', 'project_id'],
    associations: {
      questions: {type: 'hasMany', setModel: QuestionsModel, key: 'form_id'}
    },
    properties: {
      validate: function() {
        this.validatesPresence('name');
        this.validatesPresence('project_id');
      },

      getRecordModelClass: function() {
        var attributeNames = ['id'];
        this.getQuestions().forEach(function(question) {
          attributeNames.push(question.getName());
        });

        var namespace = {};
        Model.subclass(namespace, 'FormRecordModel', {
          attributeNames: attributeNames
        });
        return namespace.FormRecordModel;
      }
    }
  });

  return namespace.FormModel;
});
