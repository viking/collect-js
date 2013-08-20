define([
  'lib/maria',
  'models/record'
], function(maria, RecordModel) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'RecordsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateRecord');
    },
    properties: {
      add: function() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof RecordModel)) {
            throw('object is not a RecordModel');
          }
        }
        maria.SetModel.prototype.add.apply(this, arguments);
      },

      onValidateRecord: function(evt) {
        var obj = evt.target;
        if (obj instanceof RecordModel) {
          obj.validatesUnique('id', this);
        }
        else {
          throw('object is not a RecordModel');
        }
      }
    }
  });

  return namespace.RecordsModel;
});
