define([
  'model',
  'models/forms',
  'models/records'
], function(Model, FormsModel, RecordsModel) {
  var namespace = {};

  Model.subclass(namespace, 'ProjectModel', {
    attributeNames: ['id', 'name'],
    associations: {
      forms:   {type: 'hasMany', setModel: FormsModel, key: 'project_id'},
      records: {type: 'hasMany', setModel: RecordsModel, key: 'project_id'},
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
