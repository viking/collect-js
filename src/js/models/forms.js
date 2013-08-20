define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'FormsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateForm');
    },
    properties: {
      onValidateForm: function(evt) {
        var form = evt.target;
        form.validatesUnique('id', this);
        form.validatesUnique('name', this);
      }
    }
  });

  return namespace.FormsModel;
});
