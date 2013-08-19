require(['models/record'], function(RecordModel) {
  buster.testCase('RecordModel', {
    setUp: function() {
      this.record = new RecordModel();
    },

    "id attribute": function() {
      this.record.setId(1);
      assert.equals(this.record.getId(), 1);
    },

    "project_id attribute": function() {
      this.record.setProjectId(1);
      assert.equals(this.record.getProjectId(), 1);
    },

    "requires project id": function() {
      refute(this.record.isValid());
      this.record.setProjectId(1);
      assert(this.record.isValid());
    }
  });
});
