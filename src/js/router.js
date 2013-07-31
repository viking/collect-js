Collect.Route = function(urlPattern, callback, thisArg) {
  this._urlPattern = urlPattern;
  this._callback = callback;
  this._thisArg = thisArg;
};

Collect.Route.prototype.process = function(url) {
  var md = url.match(this._urlPattern);
  if (md) {
    this._callback.call(this._thisArg);
    return true;
  }
  return false;
};

Collect.Router = function(window) {
  this._window = window;
  this._rootUrl = this._window.location.href.replace(/\/$/, "");
  this._rootUrlPattern = new RegExp("^" + this._rootUrl);
  this._routes = [];
  maria.on(this._window, 'popstate', this, '_route');
};

Collect.Router.prototype.disconnect = function() {
  maria.off(this._window, 'popstate', this, '_route');
};

Collect.Router.prototype.add = function(urlPattern, callback, thisArg) {
  this._routes.push(new Collect.Route(urlPattern, callback, thisArg));
};

Collect.Router.prototype.go = function(url) {
  this._window.history.pushState("", "", this.urlFor(url));
  this._routeRelative(url);
};

Collect.Router.prototype.urlFor = function(url) {
  return this._rootUrl + url;
};

Collect.Router.prototype._route = function() {
  var url = this._window.location.href;
  if (url.match(this._rootUrlPattern)) {
    var url = url.replace(this._rootUrlPattern, "");
    this._routeRelative(url);
  };
};

Collect.Router.prototype._routeRelative = function(url) {
  for (var i = 0; i < this._routes.length; i++) {
    var route = this._routes[i];
    if (route.process(url)) {
      break;
    }
  }
};
