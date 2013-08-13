define(function() {
  var util = {};

  util.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  util.camelize = function(string) {
    var result = '';
    string.split('_').forEach(function(s) {
      result += util.capitalize(s);
    });
    return result;
  };

  util.instantiateModel = function(modelClass, attributes) {
    var model = new modelClass();
    for (key in attributes) {
      var method = 'set' + util.camelize(key);
      model[method].call(model, attributes[key]);
    }
    return model;
  };

  return util;
});
