define([
  'lib/maria',
  'models/form',
  'util'
], function(maria, FormModel, util) {
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
    },

    "numProperties": function() {
      assert.equals(0, util.numProperties({}));
      assert.equals(1, util.numProperties({foo: 'bar'}));

      var foo = function() {
        this.foo = 'bar';
      };
      var bar = function() {
        this.bar = 'baz';
      }
      bar.prototype = maria.create(foo);

      assert.equals(util.numProperties(new bar()), 1);
    },

    "clearProperties": function() {
      var obj = {foo: 123, bar: 456};
      util.clearProperties(obj);
      assert.equals(typeof(obj.foo), 'undefined');
      assert.equals(typeof(obj.bar), 'undefined');
    },
  });
});
