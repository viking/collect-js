define([
  'lib/test',
  'models/record'
], function(test, RecordModel) {
  return new test.Suite('RecordModel', {
    setUp: function() {
      this.record = new RecordModel();
    },

    "id attribute": function() {
      this.record.setId(1);
      this.assertEquals(this.record.getId(), 1);
    },

    "project_id attribute": function() {
      this.record.setProjectId(1);
      this.assertEquals(this.record.getProjectId(), 1);
    },

    "requires project id": function() {
      this.refute(this.record.isValid());
      this.record.setProjectId(1);
      this.assert(this.record.isValid());
    }
  });
});
