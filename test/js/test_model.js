require(['lib/maria', 'model'], function(maria, Model) {
  function newSubclass(options) {
    var namespace = {};
    Model.subclass(namespace, 'FooModel', options);
    return namespace.FooModel;
  }

  buster.testCase('ModelHelper', {
    "setAttribute": function() {
      var klass = newSubclass();
      var model = new klass();
      model.setAttribute('foo', 123);
      assert.equals(model.getAttributes(), {foo: 123})
    },

    "setAttributes": function() {
      var klass = newSubclass();
      var model = new klass();
      model.setAttributes({foo: 123, bar: 'baz'});
      assert.equals(model.getAttributes(), {foo: 123, bar: 'baz'})
    },

    "setAttribute triggers change event": function() {
      var klass = newSubclass();
      var model = new klass();
      var spy = this.spy();
      maria.on(model, "change", spy);

      model.setAttribute("foo", 123);
      assert.calledOnce(spy);
    },

    "setAttribute doesn't trigger change event for same value": function() {
      var klass = newSubclass();
      var model = new klass();
      model.setAttribute("foo", 123);

      var spy = this.spy();
      maria.on(model, "change", spy);
      model.setAttribute("foo", 123);
      refute.called(spy);
    },

    "setAttributes triggers change event once": function() {
      var klass = newSubclass();
      var model = new klass();
      var spy = this.spy();
      maria.on(model, "change", spy);

      model.setAttributes({foo: 123, bar: 'baz'});
      assert.calledOnce(spy);
    },

    "setAttributes doesn't trigger change event for same value": function() {
      var klass = newSubclass();
      var model = new klass();
      model.setAttributes({foo: 123, bar: 'baz'});

      var spy = this.spy();
      maria.on(model, "change", spy);
      model.setAttributes({foo: 123, bar: 'baz'});
      refute.called(spy);
    },

    "entityName": function() {
      var klass = newSubclass({
        entityName: 'foo'
      });
      assert.equals(klass.entityName, "foo");
    },

    "collectionName": function() {
      var klass = newSubclass({
        collectionName: 'foos'
      });
      assert.equals(klass.collectionName, "foos");
    },

    "subclass with hasMany association": function() {
      var setModel = this.spy();
      var options = {
        associations: {
          bars: {type: 'hasMany', setModel: setModel, key: 'foo_id'}
        }
      };
      var klass = newSubclass(options);
      assert.equals(klass.associations, options.associations);

      var foo = new klass();
      var bars = foo.getBars();
    }
  });
});
