define(['lib/maria', 'util'], function(maria, util) {
  var ns = {};

  maria.Model.subclass(ns, 'Model', {
    constructor: function() {
      maria.Model.apply(this, arguments);
      this._attributes = {};
    },
    properties: {
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
    }
  });

  ns.Model.subclass = function(namespace, name, options) {
    options = options || {};
    if (options.associations) {
      var properties = options.properties || (options.properties = {});
      for (var associationName in options.associations) {
        var config = options.associations[associationName];
        var setModel = config.setModel;
        var getterName = 'get' + util.capitalize(associationName);
        var variableName = '_' + associationName;

        properties[getterName] = function() {
          if (!this[variableName]) {
            this[variableName] = new setModel();
          }
          return this[variableName];
        }
      }
    }
    maria.subclass.call(this, namespace, name, options);
    var klass = namespace[name];

    if (options.associations) {
      klass.associations = {};
      maria.borrow(klass.associations, options.associations);
    }
    if (options.entityName) {
      klass.entityName = options.entityName;
    }
    if (options.collectionName) {
      klass.collectionName = options.collectionName;
    }
  };

  return ns.Model;
});
