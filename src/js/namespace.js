var Collect = {};

Collect.RouteHelper = function() {
}

Collect.RouteHelper.prototype.urlFor = function(url) {
  if (this.parentNode) {
    return this.parentNode.urlFor(url);
  }
  return url;
}

Collect.RouteHelper.mixin = function(obj) {
  obj.urlFor = Collect.RouteHelper.prototype.urlFor;
  Collect.RouteHelper.call(obj);
}
