define(['model'], function(Model) {
  var namespace = {};

  Model.subclass(namespace, 'QuestionModel', {
    attributeNames: ['id', 'name', 'type', 'prompt', 'form_id']
  });

  return namespace.QuestionModel;
});
