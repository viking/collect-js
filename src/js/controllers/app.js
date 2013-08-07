maria.Controller.subclass(Collect, 'AppController', {
  properties: {
    _currentUrl: null,
    _rootUrl: null,
    _rootUrlPattern: null,
    _rootRoute: '_projects',
    _routes: [
      ['_project', new RegExp('^/projects/(\\d+)$')]
    ],
    _useAnchors: false,

    setRootUrl: function(url) {
      if (url.match(/\.html$/)) {
        this._rootUrl = url;
        this._useAnchors = true;
        this._rootUrlPattern = new RegExp("^" + this._rootUrl + '#?');
      }
      else {
        this._rootUrl = url.replace(/\/$/, "");
        this._rootUrlPattern = new RegExp("^" + this._rootUrl);
      }
    },
    route: function() {
      var url = window.location.href;
      if (url != this._currentUrl && this._urlIsValid(url)) {
        this._route(url);
        return true;
      }
      return false;
    },
    go: function(url) {
      if (!url.match(/^\w+:\/\//)) {
        url = this.urlFor(url);
      }
      if (this._urlIsValid(url)) {
        window.history.pushState({}, "", url);
        this._route(url);
        return true;
      }
      return false;
    },
    urlFor: function(url) {
      if (this._useAnchors) {
        return (url == '/' ? this._rootUrl : this._rootUrl + '#' + url);
      }
      return this._rootUrl + url;
    },
    onNavigate: function(evt) {
      if (evt.target.tagName == "A") {
        var url = evt.target.getAttribute('href');
        this.go(url);
        evt.preventDefault();
      }
    },

    _urlIsValid: function(url) {
      return url.match(this._rootUrlPattern);
    },
    _route: function(url) {
      var method, args;

      var relativeUrl = url.replace(this._rootUrlPattern, "");
      if ((this._useAnchors && relativeUrl == "") || (!this._useAnchors && relativeUrl == "/")) {
        method = this._rootRoute;
        args = [];
      }
      else {
        for (var i = 0; i < this._routes.length; i++) {
          var md = relativeUrl.match(this._routes[i][1])
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
      else {
        throw "the url \"" + url + "\" didn't match any routes";
      }
      this._currentUrl = url;
    },

    /* Actions */

    _projects: function() {
      this.getView().showProjects();
    },

    _project: function(projectId) {
      this.getView().showProject(projectId);
    }
  }
});
