define(['model'], function(Model) {
  var namespace = {};

  Model.subclass(namespace, 'QuestionModel', {
    attributeNames: ['id', 'name', 'type', 'prompt', 'form_id'],
    properties: {
      validate: function() {
        if (this.validatesPresence('name') &&
            this.validatesType('name', 'string')) {
          this.validatesFormat('name', /^\w+$/);
        }
        this.validatesPresence('type');
        this.validatesPresence('prompt');
        this.validatesPresence('form_id');
      }
    }
  });

  return namespace.QuestionModel;
});
