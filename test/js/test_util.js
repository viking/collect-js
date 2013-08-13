define(['models/form', 'util'], function(FormModel, util) {
  buster.testCase('util', {

    "camelize": function() {
      assert.equals(util.camelize("foo_bar"), "FooBar");
    },

    "instantiateModel": function() {
      var attribs = {id: 1, name: "bar", project_id: 1};
      var model = util.instantiateModel(FormModel, attribs);
      assert.equals(model.getId(), 1);
      assert.equals(model.getName(), "bar");
      assert.equals(model.getProjectId(), 1);
    },

    "capitalize": function() {
      assert.equals(util.capitalize("huge"), "Huge");
    }
  });
});
