buster.testCase('Collect utils', {
  "camelize": function() {
    assert.equals(Collect.camelize("foo_bar"), "FooBar");
  },
  "instantiateModel": function() {
    var attribs = {id: 1, name: "bar", project_id: 1};
    var model = Collect.instantiateModel(Collect.FormModel, attribs);
    assert.equals(model.getId(), 1);
    assert.equals(model.getName(), "bar");
    assert.equals(model.getProjectId(), 1);
  }
});
