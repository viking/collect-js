require(['lib/maria', 'model'], function(maria, Model) {
  buster.testCase('Model', {
    "setAttribute": function() {
      var model = new Model();
      model.setAttribute('foo', 123);
      assert.equals(model.getAttributes(), {foo: 123})
    },

    "setAttributes": function() {
      var model = new Model();
      model.setAttributes({foo: 123, bar: 'baz'});
      assert.equals(model.getAttributes(), {foo: 123, bar: 'baz'})
    },

    "setAttribute triggers change event": function() {
      var model = new Model();
      var spy = this.spy();
      maria.on(model, "change", spy);

      model.setAttribute("foo", 123);
      assert.calledOnce(spy);
    },

    "setAttribute doesn't trigger change event for same value": function() {
      var model = new Model();
      model.setAttribute("foo", 123);

      var spy = this.spy();
      maria.on(model, "change", spy);
      model.setAttribute("foo", 123);
      refute.called(spy);
    },

    "setAttributes triggers change event once": function() {
      var model = new Model();
      var spy = this.spy();
      maria.on(model, "change", spy);

      model.setAttributes({foo: 123, bar: 'baz'});
      assert.calledOnce(spy);
    },

    "setAttributes doesn't trigger change event for same value": function() {
      var model = new Model();
      model.setAttributes({foo: 123, bar: 'baz'});

      var spy = this.spy();
      maria.on(model, "change", spy);
      model.setAttributes({foo: 123, bar: 'baz'});
      refute.called(spy);
    },
  });
});
