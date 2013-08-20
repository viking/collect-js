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
      onValidateRecord: function(evt) {
        var obj = evt.target;
        if (obj instanceof RecordModel) {
          obj.validatesUnique('id', this);
        }
        else {
          obj.addError('base', 'is not a RecordModel');
        }
      }
    }
  });

  return namespace.RecordsModel;
});
