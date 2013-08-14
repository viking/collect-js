define(['lib/maria', 'util'], function(maria, util) {
  var ns = {};

  maria.Model.subclass(ns, 'Model', {
    constructor: function() {
      maria.Model.apply(this, arguments);
      this._attributes = {};
      if (this._attributeNames) {
        for (var i = 0; i < this._attributeNames.length; i++) {
          this._attributes[this._attributeNames[i]] = null;
        }
      }
      this._errors = [];
    },
    properties: {
      _attributeNames: null,

      setAttribute: function(name, value, quiet) {
        if (this._attributeNames && this._attributeNames.indexOf(name) < 0) {
          throw("invalid attribute: " + name);
        }

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

      getAttribute: function(name) {
        if (this._attributeNames && this._attributeNames.indexOf(name) < 0) {
          throw("invalid attribute: " + name);
        }
        return this._attributes[name];
      },

      getAttributes: function() {
        return this._attributes;
      },

      validate: function() {
      },

      isValid: function() {
        this._errors.length = 0;
        this.validate();
        this.dispatchEvent({type: 'validate'});
        return this._errors.length == 0;
      },

      addError: function(msg) {
        this._errors.push(msg);
      },

      getErrors: function() {
        return this._errors;
      },

      validatesPresence: function(attributeName) {
        if (!this._attributes.hasOwnProperty(attributeName) || this._attributes[attributeName] == null) {
          this.addError(attributeName + ' is required');
        }
      },

      validatesType: function(attributeName, type) {
        if (typeof(this._attributes[attributeName]) != type) {
          this.addError(attributeName + ' must be of type "' + type + '"');
        }
      },

      validatesUnique: function(attributeName, set) {
        var value = this._attributes[attributeName];
        var valid = true;
        set.forEach(function(model) {
          if (valid && model !== this && model.getAttribute(attributeName) == value) {
            this.addError(attributeName + ' is already taken');
          }
        }, this);
      }
    }
  });

  ns.Model.subclass = function(namespace, name, options) {
    options = options || {};
    var properties = options.properties || (options.properties = {});
    if (options.associations) {
      for (var associationName in options.associations) {
        var getterName = 'get' + util.capitalize(associationName);
        var variableName = '_' + associationName;
        var config = options.associations[associationName];
        var setModel = config.setModel;

        (function(variableName, setModel) {
          properties[getterName] = function() {
            if (!this[variableName]) {
              this[variableName] = new setModel();
            }
            return this[variableName];
          }
        })(variableName, setModel);
      }
    }
    if (options.attributeNames) {
      for (var i = 0; i < options.attributeNames.length; i++) {
        var attributeName = options.attributeNames[i];
        var camelized = util.camelize(attributeName);
        var getterName = 'get' + camelized;
        var setterName = 'set' + camelized;

        (function(attributeName) {
          properties[getterName] = function() {
            return this.getAttribute(attributeName);
          }
          properties[setterName] = function(value) {
            this.setAttribute(attributeName, value);
          }
        })(attributeName);
      }
      properties._attributeNames = options.attributeNames;
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
