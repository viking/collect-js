define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.Model.subclass(namespace, 'Model', {
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
        for (key in object) {
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

  return namespace.Model;
});
