Collect.LocalStore = function(options) {
  this.options = options;
}

Collect.LocalStore.prototype.getCollection = function(name, callback) {
  var self = this;
  setTimeout(function() {
    callback(self._getCollection(name));
  }, 0);
};

Collect.LocalStore.prototype.create = function(options) {
  if (typeof(options.collection) == 'undefined') {
    throw("collection option is required");
  }

  if (typeof(options.object) == 'undefined') {
    throw("object option is required");
  }

  var self = this;
  setTimeout(function() {
    self._create.call(self, options);
  }, 0);
};

Collect.LocalStore.prototype._create = function(options) {
  var collectionName = options.collection;
  var collection = this._getCollection(collectionName);
  var nextId = collection.length + 1;

  var obj = options.object;
  var attributes = obj.attributes();

  var data = {};
  var name;
  for (name in attributes) {
    data[name] = attributes[name];
  }
  data['id'] = nextId;
  collection.push(data);
  this._setCollection(collectionName, collection);

  if (options.success) {
    options.success(nextId);
  }
};

Collect.LocalStore.prototype._getCollection = function(name) {
  var collection;
  if (typeof(localStorage[name]) == 'undefined') {
    collection = [];
  }
  else {
    collection = JSON.parse(localStorage[name]);
  }
  return collection;
};

Collect.LocalStore.prototype._setCollection = function(name, collection) {
  localStorage[name] = JSON.stringify(collection);
};
