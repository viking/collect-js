define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'ProjectsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateProject');
    },
    properties: {
      onValidateProject: function(evt) {
        var project = evt.target;
        project.validatesUnique('id', this);
        project.validatesUnique('name', this);
      }
    }
  });

  return namespace.ProjectsModel;
});
