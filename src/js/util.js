Collect.camelize = function(string) {
  var result = '';
  string.split('_').forEach(function(s) {
    result += s.charAt(0).toUpperCase() + s.slice(1);
  });
  return result;
}

Collect.instantiateModel = function(modelClass, attributes) {
  var model = new modelClass();
  for (key in attributes) {
    var method = 'set' + Collect.camelize(key);
    model[method].call(model, attributes[key]);
  }
  return model;
}
