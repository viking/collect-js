define(function() {
  var util = {};

  util.camelize = function(string) {
    var result = '';
    string.split('_').forEach(function(s) {
      result += s.charAt(0).toUpperCase() + s.slice(1);
    });
    return result;
  }

  util.instantiateModel = function(modelClass, attributes) {
    var model = new modelClass();
    for (key in attributes) {
      var method = 'set' + util.camelize(key);
      model[method].call(model, attributes[key]);
    }
    return model;
  }

  return util;
});
