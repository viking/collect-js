define([
  'lib/maria',
  'models/project'
], function(maria, ProjectModel) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'ProjectsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateProject');
    },
    properties: {
      onValidateProject: function(evt) {
        var obj = evt.target;
        if (obj instanceof ProjectModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          obj.addError('base', 'is not a ProjectModel');
        }
      }
    }
  });

  return namespace.ProjectsModel;
});
