Collect.App = function(window, storeType) {
  this._window = window;
  this._router = new Collect.Router(window);
  if (storeType == 'local') {
    this._store = new Collect.LocalStore();
  }
  this._setupRoutes();
  maria.on(window, 'load', this._router, '_start');
};

Collect.App.prototype._setupRoutes = function() {
  this._router.add('^/$', this._projects, this);
};

Collect.App.prototype._projects = function() {
  var setModel = new Collect.ProjectsModel();
  this._view = new Collect.ProjectsView(setModel);
  this._store.populate('projects', setModel, Collect.ProjectModel, {
    success: function() {
      store.addSetModel('projects', setModel);
    }
  });
  this._window.document.body.appendChild(this._view.build());
};
