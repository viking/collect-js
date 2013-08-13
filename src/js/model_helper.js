define(['lib/maria', 'util'], function(maria, util) {
  var ModelHelper = function() {
    this._attributes = {};
  }

  maria.borrow(ModelHelper.prototype, {
    setAttribute: function(name, value, quiet) {
      if (this._attributes[name] != value) {
        this._attributes[name] = value;
        if (!quiet) {
          this.dispatchEvent({type: 'change'});
        }
        return true;
      }
      return false;
    },

    setAttributes: function(object) {
      var changed = false;
      for (var key in object) {
        if (this.setAttribute(key, object[key], true)) {
          changed = true;
        }
      }
      if (changed) {
        this.dispatchEvent({type: 'change'});
      }
    },

    getAttributes: function() {
      return this._attributes;
    },
  });

  ModelHelper.extend = function(klass, options) {
    options = options || {};
    if (options.associations) {
      for (var associationName in options.associations) {
        var config = options.associations[associationName];
        var setModel = config.setModel;
        var getterName = 'get' + util.capitalize(associationName);
        var variableName = '_' + associationName;

        klass.prototype[getterName] = function() {
          if (!this[variableName]) {
            this[variableName] = new setModel();
          }
          return this[variableName];
        }
      }
      klass.associations = {};
      maria.borrow(klass.associations, options.associations);
    }
    if (options.entityName) {
      klass.entityName = options.entityName;
    }
    if (options.collectionName) {
      klass.collectionName = options.collectionName;
    }
    maria.borrow(klass.prototype, ModelHelper.prototype);
  };

  return ModelHelper;
});
