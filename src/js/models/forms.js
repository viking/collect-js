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
      add: function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof FormModel)) {
            throw('object is not a FormModel');
          }
        }
        maria.SetModel.prototype.add.apply(this, arguments);
      },

      onValidateForm: function(evt) {
        var obj = evt.target;
        if (obj instanceof FormModel) {
          obj.validatesUnique('id', this);
          obj.validatesUnique('name', this);
        }
        else {
          throw('object is not a FormModel');
        }
      }
    }
  });

  return namespace.FormsModel;
});
