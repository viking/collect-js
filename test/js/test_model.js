require(['lib/maria', 'model'], function(maria, Model) {
  function newSubclass(options) {
    var namespace = {};
    Model.subclass(namespace, 'FooModel', options);
    return namespace.FooModel;
  }

  buster.testCase('Model', {
    "setAttribute": function() {
      var klass = newSubclass();
      var model = new klass();
      model.setAttribute('foo', 123);
      assert.equals(model.getAttributes(), {foo: 123})
      assert.equals(model.getAttribute('foo'), 123)
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
    },

    "attribute names": function() {
      var klass = newSubclass({
        attributeNames: ['id', 'name', 'project_id']
      });
      var model = new klass();
      assert.equals(model.getAttributes(), {id: null, name: null, project_id: null});
    },

    "set invalid attribute": function() {
      var klass = newSubclass({
        attributeNames: ['id', 'name', 'project_id']
      });
      var model = new klass();
      assert.exception(function() {
        model.setAttribute('foo', 123);
      });
    },

    "get invalid attribute": function() {
      var klass = newSubclass({
        attributeNames: ['id', 'name', 'project_id']
      });
      var model = new klass();
      assert.exception(function() {
        model.getAttribute('foo');
      });
    },

    "attribute helpers": function() {
      var klass = newSubclass({
        attributeNames: ['id', 'name', 'project_id']
      });
      var model = new klass();
      model.setId(123);
      assert.equals(model.getId(), 123);
      model.setName('foo');
      assert.equals(model.getName(), 'foo');
      model.setProjectId(456);
      assert.equals(model.getProjectId(), 456);
    },

    "validate presence": function() {
      var klass = newSubclass({
        properties: {
          validate: function() {
            this.validatesPresence('foo');
          }
        }
      });
      var model = new klass();
      refute(model.isValid());
      assert.equals(model.getErrors(), {foo: ['is required']});
      model.setAttribute('foo', 123);
      assert(model.isValid());
    },

    "validate presence rejects empty string": function() {
      var klass = newSubclass({
        properties: {
          validate: function() {
            this.validatesPresence('foo');
          }
        }
      });
      var model = new klass();
      model.setAttribute('foo', '');
      refute(model.isValid());
      assert.equals(model.getErrors(), {foo: ['is required']});
      model.setAttribute('foo', 123);
      assert(model.isValid());
    },

    "validate type": function() {
      var klass = newSubclass({
        properties: {
          validate: function() {
            this.validatesType('foo', 'number');
          }
        }
      });
      var model = new klass();
      model.setAttribute('foo', 'bar');
      refute(model.isValid());
      model.setAttribute('foo', 123);
      assert(model.isValid());
    },

    "dispatch validate event": function() {
      var klass = newSubclass();
      var model = new klass();
      maria.on(model, 'validate', function(evt) {
        var m = evt.target;
        m.addError('foo');
      });
      refute(model.isValid());
    },

    "validates unique": function() {
      var klass = newSubclass();
      var model_1 = new klass();
      model_1.setAttribute('foo', 'bar');
      var model_2 = new klass();
      model_2.setAttribute('foo', 'baz');
      var setModel = new maria.SetModel();
      setModel.add(model_1);
      setModel.add(model_2);
      maria.on(model_1, 'validate', function(evt) {
        evt.target.validatesUnique('foo', setModel);
      });
      assert(model_1.isValid());
      model_1.setAttribute('foo', 'baz');
      refute(model_1.isValid());
    },
  });
});
