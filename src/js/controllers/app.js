define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.Controller.subclass(namespace, 'AppController', {
    properties: {
      /* instance variables */

      _window: window,

      _currentUrl: null,

      _rootUrl: null,

      _rootUrlPattern: null,

      _rootRoute: '_projects',

      _useAnchors: false,

      _routes: [
        ['_adminProjects', new RegExp('^/admin/projects$')],
        ['_adminProject',  new RegExp('^/admin/projects/(\\d+)$')],
        ['_adminForm',     new RegExp('^/admin/forms/(\\d+)$')],
      ],

      /* public methods */

      setWindow: function(window) {
        this._window = window;
      },

      getWindow: function() {
        return this._window;
      },

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
        var url = this._window.location.href;
        if (url != this._currentUrl && this._urlIsValid(url)) {
          this._route(url);
          return true;
        }
        return false;
      },

      go: function(url) {
        if (!url.match(/^\w+:|^\//)) {
          url = this.urlFor(url);
        }
        if (this._urlIsValid(url)) {
          this._window.history.pushState({}, "", url);
          this._route(url);
          return true;
        }
        return false;
      },

      urlFor: function(url) {
        url = url.replace(/^\//, '');
        if (this._useAnchors) {
          return (url == '' ? this._rootUrl : this._rootUrl + '#/' + url);
        }
        return this._rootUrl + '/' + url;
      },

      onNavigate: function(evt) {
        if (evt.target.tagName == "A") {
          var url = evt.target.getAttribute('href');
          this.go(url);
          evt.preventDefault();
        }
      },

      /* private methods */

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

      /* actions */

      _projects: function() {
        this.getView().showProjects();
      },

      _adminProjects: function() {
        this.getView().showAdminProjects();
      },

      _adminProject: function(projectId) {
        this.getView().showAdminProject(projectId);
      },

      _adminForm: function(formId) {
        this.getView().showAdminForm(formId);
      }
    }
  });

  return namespace.AppController;
});
