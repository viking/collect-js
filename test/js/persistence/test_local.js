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
});
