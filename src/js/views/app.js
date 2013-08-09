define([
  'lib/maria',
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'views/projects',
  'views/project',
  'views/forms',
  'controllers/app',
  'templates/app'
], function(maria, ProjectsModel, ProjectModel, FormsModel, FormModel, ProjectsView, ProjectView, FormsView, AppController, AppTemplate) {

  var namespace = {};

  maria.ElementView.subclass(namespace, 'AppView', {
    template: AppTemplate.source,
    controllerConstructor: AppController,
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
        var window = this.getController().getWindow();
        maria.on(window, 'popstate', this, 'onPopState');
      },
      onPopState: function(evt) {
        this.getController().route();
      },
      urlFor: function(url) {
        return this.getController().urlFor(url);
      },
      showProjects: function() {
        var projects = new ProjectsModel();
        var self = this;
        this._store.findAll('projects', projects, ProjectModel, {
          success: function() {
            self._store.addSetModel('projects', projects);
          }
        });
        this._startTransition();
        this.appendChild(new ProjectsView(projects));
        this._endTransition();
      },
      showProject: function(projectId) {
        var self = this;
        this._store.find('projects', parseInt(projectId), ProjectModel, {
          success: function(project) {
            self._startTransition();
            self.appendChild(new ProjectView(project));
            var forms = new FormsModel();
            self._store.findAll('forms', forms, FormModel, {
              filter: {project_id: project.getId()},
              success: function() {
                self._store.addSetModel('forms', forms);
              }
            });
            var formsView = new FormsView(forms);
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

  return namespace.AppView;
});
