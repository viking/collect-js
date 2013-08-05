Collect.camelize = function(string) {
  var result = '';
  string.split('_').forEach(function(s) {
    result += s.charAt(0).toUpperCase() + s.slice(1);
  });
  return result;
}
