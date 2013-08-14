define(['lib/maria', 'util'], function(maria, util) {
  var StoreSetModelProxy = function(store, collectionName, setModel, options) {
    this._store = store;
    this._collectionName = collectionName;
    this._setModel = setModel;
    this._options = options;
  }

  StoreSetModelProxy.prototype.getSetModel = function() {
    return this._setModel;
  };

  StoreSetModelProxy.prototype.handleEvent = function(evt) {
    if (evt.type != "change") {
      return;
    }

    if (evt.addedTargets) {
      evt.addedTargets.map(function(model) {
        this._store.create(this._collectionName, model, this._options);
      }, this);
    }
  }

  var LocalStore = function() {
    this._setModelProxies = {};
  }

  LocalStore.prototype.getCollection = function(name, callback) {
    var self = this;
    setTimeout(function() {
      callback(self._getCollection(name));
    }, 0);
  };

  LocalStore.prototype.create = function(collectionName, object, options) {
    if (!object.isValid()) {
      if (options.failure) {
        options.failure(object);
      }
      return;
    }

    var self = this;
    setTimeout(function() {
      self._create.call(self, collectionName, object, options);
    }, 0);
  };

  LocalStore.prototype.update = function(collectionName, object, options) {
    if (!object.isValid()) {
      if (options.failure) {
        options.failure(object);
      }
      return;
    }

    var self = this;
    setTimeout(function() {
      self._update.call(self, collectionName, object, options);
    }, 0);
  };

  LocalStore.prototype.addSetModel = function(collectionName, setModel, options) {
    var proxy = new StoreSetModelProxy(this, collectionName, setModel, options);
    maria.on(setModel, 'change', proxy);

    var proxies = this._setModelProxies[collectionName];
    if (!proxies) {
      proxies = this._setModelProxies[collectionName] = [];
    }
    proxies.push(proxy);
  }

  LocalStore.prototype.removeSetModel = function(collectionName, setModel) {
    var proxies = this._setModelProxies[collectionName];
    if (proxies) {
      proxies.map(function(proxy) {
        var model = proxy.getSetModel();
        if (model === setModel) {
          maria.off(setModel, 'change', proxy);
        }
      });
    }
  }

  LocalStore.prototype.findAll = function(collectionName, setModel, modelClass, options) {
    var self = this;
    setTimeout(function() {
      self._findAll.call(self, collectionName, setModel, modelClass, options);
    }, 0);
  }

  LocalStore.prototype.find = function(collectionName, id, modelClass, options) {
    var self = this;
    setTimeout(function() {
      self._find.call(self, collectionName, id, modelClass, options);
    }, 0);
  }

  LocalStore.prototype._create = function(collectionName, object, options) {
    var attributes = object.getAttributes();
    if (attributes.id) {
      if (options && options.failure) {
        options.failure("record id is non-null");
        return;
      }
    }

    var collection = this._getCollection(collectionName);
    var nextId = collection.length + 1;

    var record = {};
    var name;
    for (name in attributes) {
      record[name] = attributes[name];
    }
    record['id'] = nextId;
    collection.push(record);
    this._setCollection(collectionName, collection);

    object.setId(nextId);
    if (options && options.success) {
      options.success(nextId);
    }
  };

  LocalStore.prototype._update = function(collectionName, object, options) {
    var collection = this._getCollection(collectionName);

    var attributes = object.getAttributes();

    /* find existing record */
    var record;
    for (var i = 0; i < collection.length; i++) {
      if (collection[i].id == attributes.id) {
        record = collection[i];
        break;
      }
    }
    if (!record) {
      if (options && options.failure) {
        options.failure("record not found");
        return;
      }
    }

    var name;
    for (name in attributes) {
      record[name] = attributes[name];
    }
    this._setCollection(collectionName, collection);

    if (options && options.success) {
      options.success();
    }
  };

  LocalStore.prototype._getCollection = function(name) {
    var collection;
    if (typeof(localStorage[name]) == 'undefined') {
      collection = [];
    }
    else {
      collection = JSON.parse(localStorage[name]);
    }
    return collection;
  };

  LocalStore.prototype._setCollection = function(name, collection) {
    localStorage[name] = JSON.stringify(collection);
  };

  LocalStore.prototype._findAll = function(collectionName, setModel, modelClass, options) {
    var collection = this._getCollection(collectionName);
    var models = [];
    for (var i = 0; i < collection.length; i++) {
      var ok = true;
      var record = collection[i];
      if (options.filter) {
        for (fkey in options.filter) {
          if (record[fkey] != options.filter[fkey]) {
            ok = false;
            break;
          }
        }
      }
      if (ok) {
        var model = util.instantiateModel(modelClass, record);
        models.push(model);
      }
    }
    setModel.add.apply(setModel, models);
    if (options.success) {
      options.success();
    }
  };

  LocalStore.prototype._find = function(collectionName, id, modelClass, options) {
    var collection = this._getCollection(collectionName);
    for (var i = 0; i < collection.length; i++) {
      var record = collection[i];
      if (record.id == id) {
        var model = util.instantiateModel(modelClass, record);
        if (options.success) {
          options.success(model);
        }
        break;
      }
    }
  };

  return LocalStore;
});
