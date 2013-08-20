define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.SetModel.subclass(namespace, 'RecordsModel', {
    constructor: function() {
      maria.SetModel.apply(this, arguments);
      maria.on(this, 'validate', this, 'onValidateRecord');
    },
    properties: {
      onValidateRecord: function(evt) {
        var record = evt.target;
        record.validatesUnique('id', this);
        record.validatesUnique('name', this);
      }
    }
  });

  return namespace.RecordsModel;
});
