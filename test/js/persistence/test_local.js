buster.testCase('LocalStore', {
  setUp: function() {
    localStorage.clear();
    this.store = new Collect.LocalStore();
  },

  "create": function(done) {
    var obj = {
      attributes: function() { return({foo: "bar"}); }
    };

    this.store.create({
      collection: 'stuff',
      object: obj,
      success: done(function(id) {
        assert.equals(id, 1);
        assert.equals(JSON.parse(localStorage['stuff']), [{id:1,foo:"bar"}])
      })
    });
  },

  "create requires collection option": function() {
    var err;
    var obj = {
      attributes: function() { return({foo: "bar"}); }
    };
    try {
      this.store.create({object: obj});
    }
    catch(thrown) {
      err = thrown;
    }
    assert(err);
    assert.equals(err, "collection option is required");
  },

  "create requires object option": function() {
    var err;
    try {
      this.store.create({collection: 'foo'});
    }
    catch(thrown) {
      err = thrown;
    }
    assert(err);
    assert.equals(err, "object option is required");
  },

  "create with existing id": function(done) {
    var obj = {
      attributes: function() { return({id: 1, foo: "bar"}); }
    };

    this.store.create({
      collection: 'stuff',
      object: obj,
      failure: done(function(message) {
        assert.equals(message, "record id is non-null");
      })
    });
  },

  "getCollection": function(done) {
    var obj = {
      attributes: function() { return({foo: "bar"}); }
    };
    var self = this;
    this.store.create({
      collection: 'stuff',
      object: obj,
      success: function(id) {
        self.store.getCollection('stuff', done(function(data) {
          assert.equals(data, [{id:1,foo:"bar"}])
        }))
      }
    });
  },

  "update": function(done) {
    var obj = {
      data: {foo: "bar"},
      attributes: function() { return(this.data); }
    };

    var self = this;
    this.store.create({
      collection: 'stuff',
      object: obj,
      success: function(id) {
        obj.data.id = id;

        obj.data.foo = "baz";
        self.store.update({
          collection: 'stuff',
          object: obj,
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

  "update requires collection option": function() {
    var err;
    var obj = {
      attributes: function() { return({id: 1, foo: "bar"}); }
    };
    try {
      this.store.update({object: obj});
    }
    catch(thrown) {
      err = thrown;
    }
    assert(err);
    assert.equals(err, "collection option is required");
  },

  "update requires object option": function() {
    var err;
    try {
      this.store.update({collection: 'foo'});
    }
    catch(thrown) {
      err = thrown;
    }
    assert(err);
    assert.equals(err, "object option is required");
  },

  "update with bad record id": function(done) {
    var obj = {
      attributes: function() { return({id: 1, foo: "bar"}); }
    };

    this.store.update({
      collection: 'stuff',
      object: obj,
      failure: done(function(message) {
        assert.equals(message, "record not found");
      })
    });
  },
});
