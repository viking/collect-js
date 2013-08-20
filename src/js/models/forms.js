define([
  'lib/maria',
  'models/form'
], function(maria, FormModel) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'FormsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateForm');
    },
    properties: {
      onValidateForm: function(evt) {
        var obj = evt.target;
        if (obj instanceof FormModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          obj.addError('base', 'is not a FormModel');
        }
      }
    }
  });

  return namespace.FormsModel;
});
