maria.ElementView.subclass(Collect, 'AppView', {
  properties: {
    _store: null,
    setStore: function(store) {
      this._store = store;
    },
    urlFor: function(url) {
      return this.getController().urlFor(url);
    },
    showProjects: function() {
      var model = new Collect.ProjectsModel();
      var self = this;
      this._store.findAll('projects', model, Collect.ProjectModel, {
        success: function() {
          self._store.addSetModel('projects', model);
        }
      });
      this.appendChild(new Collect.ProjectsView(model));
      this.buildChildViews();
    }
  }
});
