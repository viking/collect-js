define([
  'lib/test',
  'lib/sinon',
  'lib/maria',
  'model',
  'models/records',
  'models/record'
], function(test, sinon, maria, Model, RecordsModel, RecordModel) {
  return new test.Suite('RecordsModel', {
    'validates record id uniqueness': sinon.test(function() {
      var record = new RecordModel();
      var records = new RecordsModel();
      records.add(record);

      this.stub(record, 'validatesUnique');
      record.isValid();
      this.assertCalledWith(record.validatesUnique, 'id', records);
    }),

    'validating invalid object': function() {
      var records = new RecordsModel();
      var model = new Model();
      maria.on(model, 'validate', records, 'onValidateRecord');

      this.assertException(function() {
        model.isValid();
      });
    },

    'adding invalid object': function() {
      var records = new RecordsModel();
      var model = new Model();
      this.assertException(function() {
        records.add(model);
      });
    }
  });
});
