maria.Controller.subclass(Collect, 'AppController', {
  properties: {
    _rootUrl: null,
    _rootUrlPattern: null,
    _rootRoute: '_projects',
    _routes: [],
    _useAnchors: false,

    setRootUrl: function(url) {
      if (url.match(/\.html$/)) {
        this._rootUrl = url;
        this._useAnchors = true;
      }
      else {
        this._rootUrl = url.replace(/\/$/, "");
      }
      this._rootUrlPattern = new RegExp("^" + this._rootUrl);
    },
    route: function() {
      var url = window.location.href;
      if (url.match(this._rootUrlPattern)) {
        var url = url.replace(this._rootUrlPattern, "");
        this._routeRelative(url);
      }
    },
    go: function(url) {
      window.history.pushState("", "", this.urlFor(url));
      this._routeRelative(url);
    },
    urlFor: function(url) {
      if (this._useAnchors) {
        return (url == '/' ? this._rootUrl : this._rootUrl + '#' + url);
      }
      return this._rootUrl + url;
    },

    _routeRelative: function(url) {
      var method, args;
      if ((this._useAnchors && url == "") || (!this._useAnchors && url == "/")) {
        method = this._rootRoute;
        args = [];
      }
      else {
        for (var i = 0; i < this._routes.length; i++) {
          var md = url.match(this._routes[i][1])
          if (md) {
            method = this._routes[i][0];
            args = md.slice(1);
            break;
          }
        }
      }
      if (method) {
        this[method].apply(this, args);
      }
    },
    _projects: function() {
      this.getView().showProjects();
    }
  }
});
