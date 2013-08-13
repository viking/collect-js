define([
  'model',
  'models/questions'
], function(Model, QuestionsModel) {
  var namespace = {};

  Model.subclass(namespace, 'FormModel', {
    attributeNames: ['id', 'name', 'project_id'],
    associations: {
      questions: {type: 'hasMany', setModel: QuestionsModel, key: 'form_id'}
    }
  });

  return namespace.FormModel;
});
