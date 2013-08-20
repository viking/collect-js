require([
  'lib/maria',
  'model',
  'models/records',
  'models/record'
], function(maria, Model, RecordsModel, RecordModel) {
  buster.testCase('RecordsModel', {
    'validates record id uniqueness': function() {
      var record = new RecordModel();
      var records = new RecordsModel();
      records.add(record);

      this.stub(record, 'validatesUnique');
      record.isValid();
      assert.calledWith(record.validatesUnique, 'id', records);
    },

    'validate child class': function() {
      var records = new RecordsModel();
      var model = new Model();
      maria.on(model, 'validate', records, 'onValidateRecord');

      this.stub(model, 'addError');
      model.isValid();
      assert.calledWith(model.addError, 'base', 'is not a RecordModel');
    }
  });
});
