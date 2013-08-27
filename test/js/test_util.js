define([
  'lib/test',
  'lib/maria',
  'models/form',
  'util'
], function(test, maria, FormModel, util) {
  return new test.Suite('util', {
    "camelize": function() {
      this.assertEquals(util.camelize("foo_bar"), "FooBar");
    },

    "instantiateModel": function() {
      var attribs = {id: 1, name: "bar", project_id: 1};
      var model = util.instantiateModel(FormModel, attribs);
      this.assertEquals(model.getId(), 1);
      this.assertEquals(model.getName(), "bar");
      this.assertEquals(model.getProjectId(), 1);
    },

    "capitalize": function() {
      this.assertEquals(util.capitalize("huge"), "Huge");
    },

    "numProperties": function() {
      this.assertEquals(0, util.numProperties({}));
      this.assertEquals(1, util.numProperties({foo: 'bar'}));

      var foo = function() {
        this.foo = 'bar';
      };
      var bar = function() {
        this.bar = 'baz';
      }
      bar.prototype = maria.create(foo);

      this.assertEquals(util.numProperties(new bar()), 1);
    },

    "clearProperties": function() {
      var obj = {foo: 123, bar: 456};
      util.clearProperties(obj);
      this.assertEquals(typeof(obj.foo), 'undefined');
      this.assertEquals(typeof(obj.bar), 'undefined');
    },
  });
});
