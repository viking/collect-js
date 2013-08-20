define([
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'persistence/local'
], function(ProjectsModel, ProjectModel, FormsModel, FormModel, LocalStore) {
  buster.testCase('LocalStore', {
    setUp: function() {
      localStorage.clear();
      this.store = new LocalStore();
    },

    "create": function(done) {
      var obj = {
        data: {foo: 'bar'},
        setId: function(id) { this.data.id = id; },
        isValid: function() { return true; },
        getAttributes: function() { return(this.data); }
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
        isValid: function() { return true; },
        setId: function(id) { this.data.id = id; },
        getAttributes: function() { return(this.data); }
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
        isValid: function() { return true; },
        getAttributes: function() { return(this.data); }
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
        isValid: function() { return true; },
        getAttributes: function() { return(this.data); }
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
        getAttributes: function() { return({id: 1, foo: "bar"}); },
        isValid: function() { return true; }
      };

      this.store.update('stuff', obj, {
        failure: done(function(message) {
          assert.equals(message, "record not found");
        })
      });
    },

    "reacting to set model new records": function(done) {
      var setModel = new ProjectsModel();
      this.store.addSetModel('projects', setModel, {
        success: done(function(id) {
          assert.equals(JSON.parse(localStorage['projects']), [{id:1,name:"foo"}])
        })
      });
      var model = new ProjectModel();
      model.setName('foo');
      setModel.add(model);
    },

    "stop reacting to set model changes": function(done) {
      localStorage['projects'] = '[{"id":1,"name":"foo"}]';

      var setModel = new ProjectsModel();
      this.store.addSetModel('projects', setModel);
      this.store.removeSetModel('projects', setModel);

      var model = new ProjectModel();
      model.setName('foo');
      setModel.add(model);

      setTimeout(function() {
        assert.equals(localStorage['projects'], '[{"id":1,"name":"foo"}]');
        done();
      }, 100);
    },

    "findAll adds models to set model": function(done) {
      var setModel = new ProjectsModel();
      localStorage['projects'] = '[{"id":1,"name":"foo"}]';
      this.store.findAll('projects', setModel, ProjectModel, {
        success: done(function() {
          assert.equals(setModel.size, 1);
        })
      });
    },

    "findAll camelizes attributes": function(done) {
      var setModel = new FormsModel();
      localStorage['forms'] = '[{"id":1,"name":"foo","project_id":1}]';
      this.store.findAll('forms', setModel, FormModel, {
        success: done(function() {
          setModel.forEach(function(model) {
            assert.equals(model.getProjectId(), 1);
          });
        })
      });
    },

    "findAll with filter": function(done) {
      var setModel = new FormsModel();
      localStorage['forms'] = '[{"id":1,"name":"foo","project_id":1},{"id":2,"name":"bar","project_id":1},{"id":3,"name":"baz","project_id":2}]';
      this.store.findAll('forms', setModel, FormModel, {
        filter: {project_id: 1},
        success: done(function() {
          assert.equals(setModel.size, 2);
        })
      });
    },

    "find with id": function(done) {
      localStorage['projects'] = '[{"id":1,"name":"foo"},{"id":2,"name":"bar"}]';
      this.store.find('projects', 1, ProjectModel, {
        success: done(function(model) {
          assert.equals(model.getId(), 1);
          assert.equals(model.getName(), 'foo');
        })
      });
    },

    "prevent create when object is not valid": function(done) {
      var obj = {
        data: {foo: 'bar'},
        setId: function(id) { this.data.id = id; },
        isValid: function() { return false; },
        getAttributes: function() { return(this.data); }
      };

      this.store.create('stuff', obj, {
        success: done(function(id) {
          assert(false, "model should not have been created");
        }),
        failure: done(function(model) {
          assert.same(model, obj);
        })
      });
    },

    "prevent update when object is not valid": function(done) {
      var obj = {
        data: {id: 1, foo: 'bar'},
        isValid: function() { return false; },
        getAttributes: function() { return(this.data); }
      };

      this.store.update('stuff', obj, {
        success: done(function(id) {
          assert(false, "model should not have been updated");
        }),
        failure: done(function(model) {
          assert.same(model, obj);
        })
      });
    }
  });
});
