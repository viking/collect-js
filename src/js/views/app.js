maria.ElementView.subclass(Collect, 'AppView', {
  uiActions: {
    'click section.app': 'onNavigate'
  },
  properties: {
    _store: null,
    setStore: function(store) {
      this._store = store;
    },
    buildUIActions: function() {
      maria.ElementView.prototype.buildUIActions.apply(this, arguments);
      maria.on(window, 'popstate', this, 'onPopState');
    },
    onPopState: function(evt) {
      this.getController().route();
    },
    urlFor: function(url) {
      return this.getController().urlFor(url);
    },
    showProjects: function() {
      var projects = new Collect.ProjectsModel();
      var self = this;
      this._store.findAll('projects', projects, Collect.ProjectModel, {
        success: function() {
          self._store.addSetModel('projects', projects);
        }
      });
      this._startTransition();
      this.appendChild(new Collect.ProjectsView(projects));
      this._endTransition();
    },
    showProject: function(projectId) {
      var self = this;
      this._store.find('projects', parseInt(projectId), Collect.ProjectModel, {
        success: function(project) {
          self._startTransition();
          self.appendChild(new Collect.ProjectView(project));
          var forms = new Collect.FormsModel();
          self._store.findAll('forms', forms, Collect.FormModel, {
            filter: {project_id: project.getId()},
            success: function() {
              self._store.addSetModel('forms', forms);
            }
          });
          var formsView = new Collect.FormsView(forms);
          formsView.setProjectId(project.getId());
          self.appendChild(formsView);
          self._endTransition();
        },
      });
    },
    _startTransition: function() {
      this.find('.loading').style.display = 'block';
      for (var i = this.childNodes.length-1; i >= 0; i--) {
        this.removeChild(this.childNodes[i]);
      }
    },
    _endTransition: function() {
      this.find('.loading').style.display = 'none';
    }
  }
});
