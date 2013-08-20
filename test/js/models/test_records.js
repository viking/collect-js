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

    'validating invalid object': function() {
      var records = new RecordsModel();
      var model = new Model();
      maria.on(model, 'validate', records, 'onValidateRecord');

      assert.exception(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var records = new RecordsModel();
      var model = new Model();
      assert.exception(function() {
        records.add(model);
      });
    }
  });
});
