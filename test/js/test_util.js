buster.testCase('Collect utils', {
  "camelize": function() {
    assert.equals(Collect.camelize("foo_bar"), "FooBar");
  }
});
