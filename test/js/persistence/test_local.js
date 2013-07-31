buster.testCase('LocalStore', {
  setUp: function() {
    localStorage.clear();
    this.store = new Collect.LocalStore();
  },

  "create": function(done) {
    var obj = {
      data: {foo: 'bar'},
      setId: function(id) { this.data.id = id; },
      attributes: function() { return(this.data); }
    };

    this.store.create('stuff', obj, {
      success: done(function(id) {
        assert.equals(id, 1);
        assert.equals(obj.data.id, 1);
        assert.equals(JSON.parse(localStorage['stuff']), [{id:1,foo:"bar"}])
      }),
      failure: done(function(message) {
        assert(false, message);
      })
    });
  },

  "create with existing id": function(done) {
    var obj = {
      data: {id: 1, foo: 'bar'},
      setId: function(id) { this.data.id = id; },
      attributes: function() { return(this.data); }
    };

    this.store.create('stuff', obj, {
      failure: done(function(message) {
        assert.equals(message, "record id is non-null");
      })
    });
  },

  "getCollection": function(done) {
    var obj = {
      data: {foo: 'bar'},
      setId: function(id) { this.data.id = id; },
      attributes: function() { return(this.data); }
    };
    var self = this;
    this.store.create('stuff', obj, {
      success: function(id) {
        self.store.getCollection('stuff', done(function(data) {
          assert.equals(data, [{id:1,foo:"bar"}])
        }))
      }
    });
  },

  "update": function(done) {
    var obj = {
      data: {foo: 'bar'},
      setId: function(id) { this.data.id = id; },
      attributes: function() { return(this.data); }
    };

    var self = this;
    this.store.create('stuff', obj, {
      success: function(id) {
        obj.data.foo = "baz";
        self.store.update('stuff', obj, {
          success: done(function() {
            assert.equals(
              JSON.parse(localStorage['stuff']),
              [{id:1,foo:"baz"}]
            );
          })
        });
      }
    });
  },

  "update with bad record id": function(done) {
    var obj = {
      attributes: function() { return({id: 1, foo: "bar"}); }
    };

    this.store.update('stuff', obj, {
      failure: done(function(message) {
        assert.equals(message, "record not found");
      })
    });
  },

  "reacting to set model new records": function(done) {
    var setModel = new Collect.ProjectsModel();
    this.store.addSetModel('projects', setModel, {
      success: done(function(id) {
        assert.equals(JSON.parse(localStorage['projects']), [{id:1,name:"foo"}])
      })
    });
    var model = new Collect.ProjectModel();
    model.setName('foo');
    setModel.add(model);
  },
});
