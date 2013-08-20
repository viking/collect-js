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
      add: function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof ProjectModel)) {
            throw('object is not a ProjectModel');
          }
        }
        maria.SetModel.prototype.add.apply(this, arguments);
      },

      onValidateProject: function(evt) {
        var obj = evt.target;
        if (obj instanceof ProjectModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          throw('object is not a ProjectModel');
        }
      }
    }
  });

  return namespace.ProjectsModel;
});
