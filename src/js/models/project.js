define([
  'model',
  'models/forms'
], function(Model, FormsModel) {
  var namespace = {};

  Model.subclass(namespace, 'ProjectModel', {
    attributeNames: ['id', 'name'],
    associations: {
      forms: {type: 'hasMany', setModel: FormsModel, key: 'project_id'}
    },
    properties: {
      validate: function() {
        this.validatesPresence('name');
        this.validatesType('name', 'string');
      }
    }
  });

  return namespace.ProjectModel;
});
