define(['model'], function(Model) {
  var namespace = {};

  Model.subclass(namespace, 'RecordModel', {
    attributeNames: ['id', 'project_id'],
    properties: {
      validate: function() {
        this.validatesPresence('project_id');
      }
    }
  });

  return namespace.RecordModel;
});
