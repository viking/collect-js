require([
  'models/records',
  'models/record'
], function(RecordsModel, RecordModel) {
  buster.testCase('RecordsModel', {
    'validates record id uniqueness': function() {
      var record = new RecordModel();
      var records = new RecordsModel();
      records.add(record);

      this.stub(record, 'validatesUnique');
      record.isValid();
      assert.calledWith(record.validatesUnique, 'id', records);
    }
  });
});
